import React, { useContext } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { InstituicoesContext } from "../../InstContext";
import { Ionicons } from "@expo/vector-icons";

export default function InstituicaoDoador() {
  const { id } = useLocalSearchParams() as { id?: string };
  const { getById } = useContext(InstituicoesContext);

  const inst = id ? getById(String(id)) : null;

  if (!inst) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Instituição não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollViewStyle}>
        <View style={styles.imageContainer}>
          <Image 
            source={inst.foto ? { uri: inst.foto } : require("../../assets/instituicao.png")} 
            style={styles.image} 
          />
          <View style={styles.locationOverlay}>
            <Ionicons name="location" size={16} color="#FFF" style={{ marginRight: 5 }} />
            <Text style={styles.locationText}>{inst.cep ?? "Endereço não informado"}</Text>
          </View>
        </View>

        <View style={styles.descriptionArea}>
          <Text style={styles.descriptionTitle}>{inst.nome}</Text>
          <Text style={styles.descriptionText}>{inst.descricao ?? "Descrição não informada."}</Text>
          <Text style={styles.info}>Email: {inst.email ?? "-"}</Text>
          <Text style={styles.info}>CPF/CNPJ: {inst.cpfCnpj ?? "-"}</Text>
          <Text style={styles.info}>Responsável: {inst.cpfResp ?? "-"}</Text>
        </View>

        <Text style={styles.sectionTitle}>Campanhas</Text>

        {inst.campanhas?.length > 0 ? (
          inst.campanhas.map((camp: any) => (
            <TouchableOpacity
              key={camp.id}
              style={styles.campCard}
              onPress={() =>
                router.push({
                  pathname: "/campanhaDoador",
                  params: { instId: inst.id, campanhaId: camp.id },
                })
              }
            >
              <Text style={styles.campNome}>{camp.nome}</Text>
              <Text>Meta: R$ {camp.valor}</Text>
              <Text>Arrecadado: R$ {camp.totalArrecadado ?? 0}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Nenhuma campanha ativa</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFF" 
  },
  scrollViewStyle: { 
    flex: 1 
  },
  scrollContent: { 
    paddingBottom: 20 
  },
  imageContainer: { 
    width: "100%", 
    height: 300, 
    position: "relative" 
  },
  image: { 
    width: "100%", 
    height: "100%" 
  },
  locationOverlay: { 
    position: "absolute", 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: "rgba(0,0,0,0.7)", 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    flexDirection: "row", 
    alignItems: "center" 
  },
  locationText: { 
    color: "#FFF", 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  descriptionArea: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    backgroundColor: "#FFF" 
  },
  descriptionTitle: { 
    fontSize: 22, 
    fontWeight: "700", 
    marginBottom: 8 
  },
  descriptionText: { 
    fontSize: 16, 
    lineHeight: 22, 
    color: "#333", 
    marginBottom: 12 
  },
  info: { 
    fontSize: 14, 
    color: "#555", 
    marginTop: 6 
  },
  notFound: { 
    marginTop: 50, 
    textAlign: "center" 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginLeft: 20, 
    marginVertical: 10 
  },
  campCard: { 
    backgroundColor: "#E0E0E0", 
    padding: 12, 
    marginHorizontal: 20, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  campNome: { 
    fontSize: 16, 
    fontWeight: "700", 
    marginBottom: 5 
  }
});
