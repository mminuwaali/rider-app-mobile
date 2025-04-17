const { withNativeWind } = require("nativewind/metro");
const { getDefaultConfig } = require("expo/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// Get the default Expo Metro configuration
let config = getDefaultConfig(__dirname);

// Wrap the configuration with Reanimated's Metro config
config = wrapWithReanimatedMetroConfig(config);

// Apply NativeWind's Metro configuration
config = withNativeWind(config, { input: "./src/app/global.css" });

module.exports = config;
