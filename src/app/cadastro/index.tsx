import { router, useFocusEffect } from "expo-router";
import { useState, useContext, useCallback } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert
} from "react-native";
import { UsersContext } from "../../UsersContext";

export default function Cadastro() {
  const { addUser } = useContext(UsersContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");

  function resetForm() {
    setNome("");
    setEmail("");
    setSenha("");
    setCep("");
    setTelefone("");
    setNascimento("");
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetForm();
      };
    }, [])
  );

  function handleCadastro() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !cep.trim() ||
      !telefone.trim() ||
      !nascimento.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos para continuar"
      );
      return;
    }

    const novoUsuarioData = {
      nome,
      email,
      senha,
      cep,
      telefone,
      nascimento
    };

    addUser(novoUsuarioData);

    router.navigate("/paginaPrincipal");
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Cesta do amanhã</Text>
        <Text style={styles.subTitle}>
          Insira seus dados e junte-se {"\n"}a nós
        </Text>
        <StatusBar />

        <View style={styles.branco}>
          <Text style={styles.textDadosNome}>NOME</Text>
          <TextInput
            style={styles.inputText}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.textDados}>EMAIL</Text>
          <TextInput
            style={styles.inputText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.textDados}>CRIE UMA SENHA</Text>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text style={styles.textDados}>CEP</Text>
          <TextInput
            style={styles.inputText}
            value={cep}
            onChangeText={setCep}
          />

          <Text style={styles.textDados}>TELEFONE</Text>
          <TextInput
            style={styles.inputText}
            value={telefone}
            onChangeText={setTelefone}
          />

          <Text style={styles.textDados}>DATA DE NASCIMENTO</Text>
          <TextInput
            style={styles.inputText}
            value={nascimento}
            onChangeText={setNascimento}
          />

          <Pressable style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#457b9d"
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#feb06a"
  },
  subTitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#f1faee"
  },
  branco: {
    marginTop: 20,
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 25,
    width: "90%",
    paddingBottom: 20
  },
  textDadosNome: {
    marginLeft: 24,
    marginTop: 20,
    marginBottom: -10
  },
  textDados: {
    marginLeft: 24,
    marginTop: 10,
    marginBottom: -10
  },
  inputText: {
    marginLeft: 18,
    backgroundColor: "#D3D3D3",
    borderRadius: 20,
    fontSize: 18,
    width: "90%",
    height: 50,
    paddingHorizontal: 15,
    margin: 10
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#feb06a",
    width: "80%",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  }
});
