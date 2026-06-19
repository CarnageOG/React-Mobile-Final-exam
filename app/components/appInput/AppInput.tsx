import { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type AppInputPropsType = {
  placeholder: string;
  value?: string | undefined;
  inputStyles?: ViewStyle | undefined;
  onChangeText: Dispatch<SetStateAction<string>>;
} & TextInputProps &
  ViewStyle;

const AppInput = ({
  placeholder,
  value,
  inputStyles,
  onChangeText,
  ...props
}: AppInputPropsType) => {
  return (
    <View style={[styles.inputContainer, inputStyles]}>
      <TextInput
        {...props}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#777777"
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 300,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ACACAC",
    backgroundColor: "#EDEDED",
  },
});
