import { Dimensions, StyleSheet, StyleProp, ViewStyle, View } from "react-native";

interface ChildrenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Card({ children, style }: ChildrenProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

//screen and window on dimension-> screen is everything on the device including the status bar while windows is everything excluding the status bar
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: deviceWidth < 380 ? 12 : 24,
    padding: deviceWidth < 380 ? 8 : 16,
    backgroundColor: "rgba(7, 145, 149, 1)",
    borderRadius: 10,    
  },
});
