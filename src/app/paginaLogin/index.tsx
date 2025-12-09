import { Botao } from "../../componentes/Botao";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function PaginaLogin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem vindo["a"] ao Cesta ["do"] amanhã!
      </Text>
      <Text
        onPress={() => router.navigate("cadastrolnst")}
        title="Instituição"
      />
      <Text>Realize o login para acessar sua conta!</Text>
      <Text
        onPress={() => router.navigate("cadastro")}
        title="Voluntario"
      />
      <Text>Faça o cadastro se for sua primeira vez!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a57b9d",
  },
  title: {
    fontSize: 55,
    textAlign: "center",
    fontWeight: "bold",
  },
});