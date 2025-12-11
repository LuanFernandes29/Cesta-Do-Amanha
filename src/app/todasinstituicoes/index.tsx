import React, { useContext } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { InstituicoesContext } from "../../InstContext";
import { router } from "expo-router";

export default function TodasInstituicoes() {
  const { insts } = useContext(InstituicoesContext);

  return (
    <ScrollView style={styles.container}>
      {insts.map(inst => (
        <TouchableOpacity
          key={inst.id}
          style={styles.card}
          onPress={() =>
            router.push({ pathname: "/instituicaoDoador", params: { id: inst.id } })
          }
        >
          <Image
            source={inst.foto ? { uri: inst.foto } : require("../../assets/instituicao.png")}
            style={styles.image}
          />
          <Text style={styles.nome}>{inst.nome}</Text>
        </TouchableOpacity>
      ))}

      {insts.length === 0 && <Text style={styles.aviso}>Nenhuma instituição cadastrada</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { height: 180, width: "100%" },
  nome: { padding: 12, fontSize: 18, fontWeight: "700", color: "#3D739C" },
  aviso: { textAlign: "center", marginTop: 30 },
});
