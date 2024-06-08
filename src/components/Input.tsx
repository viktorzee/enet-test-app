import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

interface CustomInputProps extends TextInputProps {
  isInvalid?: boolean;
}

const Input = ({
    onChangeText,
    secureTextEntry,
    keyboardType,
    isInvalid,
    value,
    accessibilityLabel,
    style,
    placeholder,
}: CustomInputProps) => {    
    return (
        <View style={styles.inputContainer}>
          {accessibilityLabel ? (<Text style={[styles.label, style, isInvalid && styles.labelInvalid]}>
            {accessibilityLabel}
          </Text>) :  ""}
          <TextInput
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            value={value}            
            keyboardType={keyboardType}
            placeholder={placeholder}
            style={[styles.input, style, isInvalid && styles.inputInvalid]}
          />
        </View>
    );    
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginBottom: 16
  },
  label: {
    color: "rgba(0,0,0,1)",
    marginBottom: 4,
    fontWeight: "700",
    // fontFamily: 'Montserrat'
  },
  labelInvalid: {
    color: Colors.error100,
  },
  input: {
    borderRadius: 4,
    fontSize: 16,
    borderColor: Colors.placeholderText,
    padding: 12,
    borderWidth: 1,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
    borderWidth: 1,
    borderColor: Colors.error100,
  },
});