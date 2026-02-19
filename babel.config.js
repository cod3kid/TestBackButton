module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        blocklist: null,
        allowlist: null,
        safe: true,
        allowUndefined: false,
      },
    ],
    ['react-native-worklets-core/plugin'],
    ['react-native-worklets/plugin'],
  ],
};
