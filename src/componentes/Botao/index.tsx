import { Pressable, StyleSheet, Text } from "react-native";

type BotaoProps = {
  title: string;
  onPress?: () => void;
};

export const Botao = ({ onPress, title }: BotaoProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text
        style={styles.buttonTitle}
        // Garante que o texto fique em uma linha
        numberOfLines={1}
        // Permite que o texto encolha (diminua o tamanho da fonte) se for muito longo
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#feb06a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "85%",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  }
});