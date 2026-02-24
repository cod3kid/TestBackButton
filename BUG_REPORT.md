# Bug: Events with null instanceHandle are not dropped in UIManagerBinding::dispatchEventToJS

## Summary

In `UIManagerBinding::dispatchEventToJS`, when `instanceHandle` is null, the code logs that the event "will be dropped" but does not actually drop it. The event is still dispatched to JavaScript via `eventHandler_->call()`, which can cause crashes — particularly when native modules (like `react-native-mediapipe`) alter Fabric's component lifecycle timing.

## File

`ReactCommon/react/renderer/uimanager/UIManagerBinding.cpp` — `dispatchEventToJS` method

## Current behavior

```cpp
if (instanceHandle.isNull()) {
    // Do not log all missing instanceHandles to avoid log spam
    LOG_EVERY_N(INFO, 10) << "instanceHandle is null, event of type " << type
                          << " will be dropped";
}

currentEventPriority_ = priority;
if (eventHandler_) {
    eventHandler_->call(
        runtime,
        std::move(instanceHandle),
        jsi::String::createFromUtf8(runtime, type),
        std::move(payload));
}
```

The `if (instanceHandle.isNull())` block only logs a message saying the event "will be dropped", but execution continues and the event is dispatched to JavaScript with a null `instanceHandle`.

## Expected behavior

Events with a null `instanceHandle` should be dropped (return early), since there is no valid React component to target.

## Proposed fix

Add `return;` inside the null `instanceHandle` check so the event is actually dropped:

```cpp
if (instanceHandle.isNull()) {
    return;
}
```

## Steps to reproduce

1. Create a React Native 0.80.2 app (new architecture / Fabric enabled)
2. Install `react-native-mediapipe` (or any library that registers old-architecture `RCTEventEmitter` native modules via bridge interop)
3. Set up a native stack navigator (`@react-navigation/native-stack`) with at least two screens, one containing a `FlatList`
4. Navigate to the second screen, then press the back button
5. The app crashes

## Root cause analysis

During back navigation, Fabric unmounts the departing screen's component tree. However, UIKit's animation is still running and triggers layout passes (`viewDidLayoutSubviews`) that dispatch native events (e.g., `topHeaderHeightChange`, `topMomentumScrollEnd`) to the now-unmounted screen.

These events arrive at `UIManagerBinding::dispatchEventToJS` with a null `eventTarget`, which produces a null `instanceHandle`. The code correctly identifies this condition and logs that the event "will be dropped" — but then proceeds to dispatch it anyway.

When third-party native modules (like `react-native-mediapipe`) are installed, they register old-architecture `RCTEventEmitter` modules that run through bridge interop on the new architecture. This alters the timing of Fabric's component lifecycle enough that these orphaned events occur more frequently and reliably, making the crash reproducible.

The crash manifests in `google::LogMessage::~LogMessage` (glog's destructor) because `LOG_EVERY_N` is called in a context where the glog infrastructure encounters issues, leading to `SIGABRT` via `_pthread_kill`.

## Crash stack trace

```
Thread: com.facebook.react.runtime.JavaScript

0  _pthread_kill
1  google::LogMessage::~LogMessage
2  facebook::react::UIManagerBinding::dispatchEventToJS
3  facebook::react::UIManagerBinding::dispatchEvent
4  std::__1::invoke(...)
...
7  facebook::react::UIManager::visitBinding
...
```

### Debugger state at crash

```
eventTarget:    const facebook::react::EventTarget * NULL (0x0000000000000000)
type:           const std::string & "topMomentumScrollEnd"
instanceHandle: jsi::Value (null)
```

## Environment

- React Native: 0.80.2 (new architecture)
- iOS only
- react-native-screens: 4.23.0
- @react-navigation/native-stack: 7.13.0
- Trigger: any third-party library registering old-arch RCTEventEmitter modules (confirmed with react-native-mediapipe 0.6.0)

## Impact

This is a crash in production for any app that:
- Uses the new architecture (Fabric)
- Uses native stack navigation with screen transitions
- Has third-party native modules using old-architecture `RCTEventEmitter` through bridge interop
