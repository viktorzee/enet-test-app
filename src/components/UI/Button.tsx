import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  onPress: () => void; 
  style?:  StyleProp<ViewStyle>;
  color?: string
}

const Button:React.FC<ButtonProps> = ({ children, onPress, disabled, style, color="white", ...rest }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      disabled={disabled}
      {...rest}
    >
      <View>
        <Text style={[styles.buttonText, {color}]}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    // paddingVertical: 6,
    // paddingHorizontal: 12,   
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 15,
    // width: '60%',
    // textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
