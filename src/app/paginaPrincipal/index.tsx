import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useRef } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { InstituicoesContext } from "../../InstContext";
import { UsersContext } from "../../UsersContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_MARGIN = 20;

export default function PaginaPrincipal() {
  const { insts } = useContext(InstituicoesContext);
  const { currentUser } = useContext(UsersContext);

  const scrollRef = useRef<ScrollView | null>(null);
  let currentScrollPos = 0;

  const mostradas = insts.slice(0, 3);

  const scrollRight = () => {
    currentScrollPos += CARD_WIDTH + CARD_MARGIN;
    if (currentScrollPos > (mostradas.length - 1) * (CARD_WIDTH + CARD_MARGIN)) {
      currentScrollPos = 0;
    }
    scrollRef.current?.scrollTo({ x: currentScrollPos, animated: true });
  };

  const scrollLeft = () => {
    currentScrollPos -= CARD_WIDTH + CARD_MARGIN;
    if (currentScrollPos < 0) currentScrollPos = 0;
    scrollRef.current?.scrollTo({ x: currentScrollPos, animated: true });
  };

  function abrirInstituicao(id: number) {
    router.push({ pathname: "/instituicaoDoador", params: { id: String(id) } });
  }

  function abrirPerfil() {
    router.push("/Perfil");
  }

  if (!currentUser) return null;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e9e6e6" />

      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Olá, {currentUser.nome}</Text>
          <Text style={styles.subtitulo}>AJUDE COMO PUDER</Text>
        </View>

        <TouchableOpacity style={styles.fotoContainer} onPress={abrirPerfil}>
          {currentUser.foto ? (
            <Image source={{ uri: currentUser.foto }} style={styles.perfilImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={60} color="#3D739C" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7A9EB8" />
        <TextInput style={styles.searchInput} placeholder="Procure por campanhas" />
      </View>

      <View style={styles.instituicoesHeader}>
        <Text style={styles.instituicoesTitulo}>Principais Instituições</Text>
      </View>

      <View style={styles.carrosselWrapper}>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {mostradas.length === 0 ? (
            <View style={styles.card} key="empty">
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>Nenhuma campanha cadastrada</Text>
              </View>
            </View>
          ) : (
            mostradas.map(inst => (
              <TouchableOpacity
                key={String(inst.id)}
                style={styles.card}
                onPress={() => abrirInstituicao(inst.id)}
              >
                <Image
                  source={inst.foto ? { uri: inst.foto } : require("../../assets/instituicao.png")}
                  style={styles.cardImage}
                />
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>{inst.nome}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={styles.arrowLeft} onPress={scrollLeft}>
          <Ionicons name="chevron-back-circle" size={30} color="#3D739C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowRight} onPress={scrollRight}>
          <Ionicons name="chevron-forward-circle" size={30} color="#3D739C" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(239, 237, 237)",
    paddingTop: 50,
  },
  cabecalho: {
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    color: "#76A1C2",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitulo: {
    color: "#7A9EB8",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },
  fotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  perfilImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#021123",
  },
  instituicoesHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  instituicoesTitulo: {
    fontSize: 27.3,
    fontWeight: "700",
    color: "#3D739C",
  },
  carrosselWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 350,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: CARD_MARGIN,
    backgroundColor: "#fff",
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  emptyCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7A9EB8",
  },
  arrowLeft: {
    position: "absolute",
    top: "40%",
    left: 5,
  },
  arrowRight: {
    position: "absolute",
    top: "40%",
    right: 5,
  },
});
