import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type AppButtonPropsType = {
  title: string;
  handlePress: () => void;
  activeOpacity?: number;
} & TouchableOpacityProps;

const AppButton = ({
  title,
  handlePress,
  activeOpacity = 0.6,
  ...props
}: AppButtonPropsType) => {
  return (
    <TouchableOpacity
      {...props}
      style={styles.container}
      onPress={handlePress}
      activeOpacity={activeOpacity}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#070D0D",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});