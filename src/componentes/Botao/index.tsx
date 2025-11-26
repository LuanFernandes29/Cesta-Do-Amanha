import { Pressable, StyleSheet, Text } from "react-native";

type BotaoProps = {
  title: string;           
  onPress?: () => void;      
};

export const Botao = ({ onPress, title }: BotaoProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#feb06a",
    padding: 10,
    width: "75%",
    height: "6%",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
