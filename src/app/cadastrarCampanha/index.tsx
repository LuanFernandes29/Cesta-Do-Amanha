import React, { useState, useContext } from "react";
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
import { router } from "expo-router";

export default function CadastrarCampanha() {
  const { insts, addCampanha } = useContext(InstituicoesContext);
  const inst = insts && insts.length > 0 ? insts[0] : null;

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  async function escolherFoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Permissão para acessar fotos é necessária.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  function salvar() {
    if (!inst) {
      Alert.alert("Erro", "Nenhuma instituição encontrada para adicionar a campanha.");
      return;
    }
    if (!nome.trim()) {
      Alert.alert("Preencha o nome");
      return;
    }
    const nova = {
      id: Date.now().toString(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      valor: valor.trim(),
      foto,
    };
    addCampanha(inst.id, nova);
    router.navigate("/paginaPrincipalInstituicao");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.titulo}>Cadastrar Campanha</Text>

      <TouchableOpacity style={styles.fotoBox} onPress={escolherFoto}>
        {foto ? <Image source={{ uri: foto }} style={styles.fotoPreview} /> : <Text style={styles.fotoTexto}>Adicionar foto</Text>}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome da campanha" value={nome} onChangeText={setNome} placeholderTextColor="#7A9EB8" />

      <TextInput style={[styles.input, { height: 120 }]} placeholder="Descrição" multiline value={descricao} onChangeText={setDescricao} placeholderTextColor="#7A9EB8" />

      <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" value={valor} onChangeText={setValor} placeholderTextColor="#7A9EB8" />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Campanha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(239, 237, 237)", padding: 20, paddingTop: 60 },
  titulo: { fontSize: 24, fontWeight: "700", color: "#3D739C", marginBottom: 20 },
  fotoBox: { width: "100%", height: 180, backgroundColor: "#d9d9d9", borderRadius: 15, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  fotoTexto: { color: "#4d6c82", fontSize: 16, fontWeight: "600" },
  fotoPreview: { width: "100%", height: "100%", borderRadius: 15 },
  input: { backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15, marginBottom: 15, borderWidth: 1, borderColor: "#ccc" },
  botao: { backgroundColor: "#3D739C", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
