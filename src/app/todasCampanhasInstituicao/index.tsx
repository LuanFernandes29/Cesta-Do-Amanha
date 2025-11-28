import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { InstituicoesContext } from "../../InstContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TodasCampanhasInstituicao() {
  const { insts } = useContext(InstituicoesContext);
  const inst = insts && insts.length > 0 ? insts[0] : null;

  const campanhas = Array.isArray(inst?.campanhas) ? inst.campanhas : [];

  function abrirCampanha(id: any) {
    router.push({
      pathname: "/campanhaDetalhes",
      params: { id: String(id), instId: String(inst?.id ?? "") },
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/paginaPrincipalInstituicao')}>
          <Ionicons name="arrow-back" size={26} color="#3D739C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Todas as Campanhas</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Lista de campanhas */}
      <View style={styles.content}>
        {campanhas.map((camp: any) => (
          <TouchableOpacity
            key={camp.id}
            style={styles.card}
            onPress={() => abrirCampanha(camp.id)}
          >
            {camp.foto ? (
              <Image source={{ uri: camp.foto }} style={styles.cardImage} />
            ) : (
                <Image
                source={require("../../assets/instituicao.png")}
                style={styles.cardImage}
              />
            )}

            <View style={styles.cardInfo}>
              <Text style={styles.cardNome}>{camp.nome}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {camp.descricao}
              </Text>
              <Text style={styles.cardValor}>R$ {camp.valor ?? "0,00"}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {campanhas.length === 0 && (
          <Text style={styles.aviso}>Nenhuma campanha cadastrada ainda.</Text>
        )}
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
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3D739C",
  },

  content: {
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  cardImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  cardInfo: {
    padding: 15,
  },
  cardNome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3D739C",
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: "#6D8FA6",
    marginBottom: 8,
  },
  cardValor: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3D739C",
  },

  aviso: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#6D8FA6",
  },
});
