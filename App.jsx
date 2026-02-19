import 'react-native-gesture-handler'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from './src/store/store';
import AuthNavigator from './src/navigation/AuthNavigator';
import "./global.css"

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AuthNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;