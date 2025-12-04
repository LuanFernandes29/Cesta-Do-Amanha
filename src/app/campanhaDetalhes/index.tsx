import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { InstituicoesContext } from "../../InstContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CampanhaDetalhes() {
  const { id, instId } = useLocalSearchParams();
  const { insts, removeCampanha } = useContext(InstituicoesContext);

  const inst = insts.find((i: any) => String(i.id) === String(instId));
  const campanha =
    inst?.campanhas.find((c: any) => String(c.id) === String(id)) || null;

  function excluir() {
    Alert.alert(
      "Excluir Campanha",
      "Tem certeza que deseja excluir esta campanha?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            removeCampanha(instId, id);
            router.replace("/paginaPrincipalInstituicao");
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/paginaPrincipalInstituicao") }>/
          <Ionicons name="arrow-back" size={26} color="#3D739C" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalhes da Campanha</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Imagem */}
      {campanha?.foto ? (
        <Image source={{ uri: campanha.foto }} style={styles.image} />
      ) : (
        <Image
          source={require("../../assets/instituicao.png")}
          style={styles.image}
        />
      )}

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.nome}>{campanha?.nome}</Text>

        <Text style={styles.valor}>Meta: R$ {campanha?.valor ?? "0,00"}</Text>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.descricao}>{campanha?.descricao}</Text>

        <Text style={styles.sectionTitle}>Instituição</Text>
        <Text style={styles.instituicao}>{inst?.nome}</Text>

        {/* Botão Excluir */}
        <TouchableOpacity style={styles.botaoExcluir} onPress={excluir}>
          <Text style={styles.botaoExcluirTexto}>Excluir Campanha</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(239, 237, 237)",
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3D739C",
  },

  image: {
    width: "90%",
    height: 220,
    alignSelf: "center",
    borderRadius: 18,
    marginBottom: 20,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  nome: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3D739C",
    marginBottom: 10,
  },

  valor: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3D739C",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3D739C",
    marginTop: 15,
    marginBottom: 5,
  },

  descricao: {
    fontSize: 15,
    color: "#6D8FA6",
    textAlign: "justify",
  },

  instituicao: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6D8FA6",
    marginBottom: 20,
  },

  botaoExcluir: {
    backgroundColor: "#C62828",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },

  botaoExcluirTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  }
});
