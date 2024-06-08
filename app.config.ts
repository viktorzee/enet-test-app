import { ExpoConfig, ConfigContext } from '@expo/config'

const APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
const PROJECTID = process.env.EXPO_PUBLIC_EAS_PROJECTID;

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
    name: "enet-test-app",
    slug: "enet-test-app",
    version: "1.0.0",
    orientation: "portrait",    
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.viktorzee.enettestapp",
      config: {
        googleMaps: {
          apiKey: APIKEY?.toString()
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: PROJECTID?.toString()
      }
    }
})