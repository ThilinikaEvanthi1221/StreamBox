export default {
  expo: {
    name: "StreamBox",
    slug: "StreamBox",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#E50914"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.streambox.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#E50914"
      },
      package: "com.streambox.app",
      softwareKeyboardLayoutMode: "pan"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-font"
      ]
    ],
    extra: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN,
    }
  }
};
