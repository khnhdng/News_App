module.exports = function (api) {
  api.cache(true);
  return {
// presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
// presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],

presets: ['babel-preset-expo'],
plugins: [
  ['module:react-native-dotenv', {
    moduleName: '@env',
    path: '.env',
  }],
],

  };
};