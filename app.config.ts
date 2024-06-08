import { ExpoConfig, ConfigContext } from '@expo/config'

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;
const projectId = process.env.EXPO_PUBLIC_EAS_PROJECTID as string;

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
          apiKey: "AIzaSyC4-Tlwi6RXVrozLwoFxxwhfr5_aK6DrYg",
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "6975f332-e140-4b84-9b85-25a171d95e01",
      }
    }
})