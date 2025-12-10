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

  if (!currentUser) return null;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e9e6e6" />

      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Olá, {currentUser.nome}</Text>
          <Text style={styles.subtitulo}>AJUDE COMO PUDER</Text>
        </View>

        <View style={styles.fotoContainer}>
          <Image source={require("../../assets/fototeste.jpg")} style={styles.perfilImage} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7A9EB8" />
        <TextInput style={styles.searchInput} placeholder="Procure por campanhas" />
      </View>

      <View style={styles.instituicoesHeader}>
        <Text style={styles.instituicoesTitulo}>Principais Instituições</Text>
      </View>

      <View style={styles.carrosselWrapper}>
        <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false} scrollEnabled={false}>
          {mostradas.map(inst => (
            <TouchableOpacity key={inst.id} style={styles.card} onPress={() => abrirInstituicao(inst.id)}>
              <Image
                source={inst.foto ? { uri: inst.foto } : require("../../assets/instituicao.png")}
                style={styles.cardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle}>{inst.nome}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#3D739C",
  },

  perfilImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#021123",
  },

  instituicoesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },

  instituicoesTitulo: {
    fontSize: 27.3,
    fontWeight: "700",
    color: "#3D739C",
  },

  verTudo: {
    fontSize: 12,
    color: "#7A9EB8",
  },

  carrosselWrapper: {
    position: "relative",
    marginBottom: 20,
  },

  carrosselContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  card: {
    width: CARD_WIDTH,
    height: 350,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: CARD_MARGIN,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

  arrowLeft: {
    position: "absolute",
    top: "40%",
    left: 5,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 2,
  },

  arrowRight: {
    position: "absolute",
    top: "40%",
    right: 5,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 2,
  },
});
