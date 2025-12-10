import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { InstituicoesContext } from "../../InstContext";
import { UsersContext } from "../../UsersContext";
import { router } from "expo-router";

export default function CadastrarCampanha() {
  const { currentUser } = useContext(UsersContext);
  const { addCampanha } = useContext(InstituicoesContext);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  async function escolherFoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "É necessário permitir acesso às fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  function salvar() {
    if (!currentUser || currentUser.tipo !== "instituicao") {
      Alert.alert("Erro", "Apenas instituições podem cadastrar campanhas.");
      return;
    }

    if (!nome.trim()) {
      Alert.alert("Erro", "Informe o nome da campanha.");
      return;
    }

    const novaCampanha = {
      id: Date.now().toString(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      valor: valor.trim(),
      foto,
    };

    addCampanha(currentUser.id, novaCampanha);
    router.replace("/paginaPrincipalInstituicao");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Campanha</Text>

      <TouchableOpacity style={styles.fotoBox} onPress={escolherFoto}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.fotoPreview} />
        ) : (
          <Text style={styles.fotoTexto}>Adicionar foto</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome da campanha"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Campanha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(239,237,237)",
    padding: 20,
    paddingTop: 60
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3D739C",
    marginBottom: 20
  },

  fotoBox: {
    width: "100%",
    height: 180,
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  fotoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4d6c82"
  },

  fotoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 15
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc"
  },

  botao: {
    backgroundColor: "#3D739C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center"
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
  }
});
