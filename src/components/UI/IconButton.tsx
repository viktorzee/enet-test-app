import { Pressable, StyleSheet, PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProp extends PressableProps {
  color: string;
  size: number;
  icon: keyof typeof Ionicons.glyphMap;
}

function IconButton({ icon, color, size, onPress }: IconButtonProp) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
