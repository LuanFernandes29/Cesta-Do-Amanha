import { useState, useContext, useEffect } from "react";
import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";

import { UsersContext } from "../../UsersContext"; 

export default function Login() {
  const { login } = useContext(UsersContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Limpa campos ao entrar na página
  useEffect(() => {
    setEmail("");
    setSenha("");
  }, []);

  function VerifyLogin() {
    const user = login(email, senha);

    // Limpa campos independentemente do sucesso
    setEmail("");
    setSenha("");

    if (!user) {
      alert("Email ou senha incorretos!");
      return;
    }

    if (user.tipo === "instituicao") {
      router.push({
        pathname: "/paginaPrincipalInstituicao",
        params: { instId: user.id },
      });
    } else {
      router.replace("/paginaPrincipal");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cesta do amanhã</Text>
      <Text style={styles.subTitle}>Entrar</Text>
      <StatusBar />
      <View style={styles.branco}>
        <Text style={styles.textDados}>EMAIL</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />

        <Text style={styles.textDados}>SENHA</Text>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          onChangeText={setSenha}
          value={senha}
        />

        <Pressable style={styles.button} onPress={VerifyLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#457b9d"
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#feb06a'
  },
  subTitle: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 20
  },
  branco: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "85%"
  },
  textDados: {
    marginLeft: 10,
    marginTop: 10
  },
  inputText: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    marginTop: 5
  },
  button: {
    backgroundColor: "#feb06a",
    padding: 12,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
});
