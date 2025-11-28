import React, { useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { InstituicoesContext } from "../../InstContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.82;
const CARD_MARGIN = 22;

const FotoPerfilMock = () => (
  <View style={styles.fotoContainer}>
    <Image source={require("../../assets/fototeste.jpg")} style={styles.perfilImage} />
  </View>
);

export default function PaginaInstituicao() {
  const { insts } = useContext(InstituicoesContext);
  const inst = insts && insts.length > 0 ? insts[0] : null;
  const campanhas = Array.isArray(inst?.campanhas) ? inst!.campanhas : [];

  const scrollRef = useRef<ScrollView | null>(null);
  let currentScrollPos = 0;
  const mostradas = campanhas.slice(0, 3);

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

  function abrirCampanha(id: any) {
    router.push({
      pathname: "/campanhaDetalhes",
      params: { id: String(id), instId: String(inst?.id ?? "") },
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#e9e6e6" />
      <View style={styles.cabecalho}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>Olá, {inst ? inst.nome : "Instituição"}</Text>
          <Text style={styles.subtitulo}>GERENCIE SUAS CAMPANHAS</Text>
        </View>
        <FotoPerfilMock />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7A9EB8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar voluntários ou doações"
          placeholderTextColor="#7A9EB8"
        />
      </View>

      <View style={styles.instituicoesHeader}>
        <Text style={styles.instituicoesTitulo}>Minhas Campanhas Ativas</Text>
      </View>

      <View style={styles.carrosselWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carrosselContainer}
          ref={scrollRef}
          scrollEnabled={false}
        >
          {mostradas.map((item: any) => (
            <TouchableOpacity key={item.id} style={styles.card} onPress={() => abrirCampanha(item.id)}>
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.cardImage} />
              ) : (
                <Image source={require("../../assets/instituicao.png")} style={styles.cardImage} />
              )}
              <View style={styles.campanhaOverlay}>
                <Text style={styles.campanhaNome}>{item.nome || item.titulo}</Text>
                <Text style={styles.campanhaStatus}>Doando agora</Text>
                <Text style={styles.campanhaValor}>R$ {item.valor ?? "0,00"}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {mostradas.length === 0 && (
            <View style={[styles.card, { justifyContent: "center", alignItems: "center" }]}>
              <Text>Nenhuma campanha ativa</Text>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.arrowLeft} onPress={scrollLeft}>
          <Ionicons name="chevron-back-circle" size={30} color="#3D739C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowRight} onPress={scrollRight}>
          <Ionicons name="chevron-forward-circle" size={30} color="#3D739C" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoCadastrar} onPress={() => router.push("/cadastrarCampanha")}>
        <Text style={styles.botaoCadastrarTexto}>Cadastrar Nova Campanha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(239, 237, 237)", paddingTop: 50 },
  cabecalho: {
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: { color: "#76A1C2", fontSize: 24, fontWeight: "700" },
  subtitulo: { color: "#7A9EB8", fontSize: 12, fontWeight: "600", marginTop: 3 },
  fotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#3D739C",
  },
  perfilImage: { width: "100%", height: "100%", resizeMode: "cover" },
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
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: "#021123" },
  instituicoesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  instituicoesTitulo: { fontSize: 26, fontWeight: "700", color: "#3D739C" },
  verTudo: { fontSize: 14, color: "#3D739C", fontWeight: "700" },
  carrosselWrapper: { position: "relative", marginBottom: 20 },
  carrosselContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  card: {
    width: CARD_WIDTH,
    height: 350,
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: CARD_MARGIN / 2,
    backgroundColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
  campanhaOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  campanhaNome: { color: "#fff", fontSize: 18, fontWeight: "700" },
  campanhaStatus: { color: "#eaeaea", fontSize: 13 },
  campanhaValor: { color: "#fff", fontSize: 16, fontWeight: "700" },
  arrowLeft: {
    position: "absolute",
    top: "40%",
    left: 5,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 2,
  },
  arrowRight: {
    position: "absolute",
    top: "40%",
    right: 5,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 2,
  },
  botaoCadastrar: {
    backgroundColor: "#3D739C",
    marginHorizontal: 50,
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoCadastrarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
