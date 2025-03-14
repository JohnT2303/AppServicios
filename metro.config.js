const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add custom resolver for native modules
config.resolver = {
  ...config.resolver,
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
  resolverMainFields: ['react-native', 'browser', 'main'],
};

module.exports = config; 