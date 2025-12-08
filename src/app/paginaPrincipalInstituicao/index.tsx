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
<<<<<<< HEAD
import { router } from "expo-router";
import { InstituicoesContext } from "../../InstContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_MARGIN = 20;

const FotoPerfilMock = () => (
  <View style={styles.fotoContainer}>
    <Image source={require("../../assets/fototeste.jpg")} style={styles.perfilImage} />
  </View>
);

export default function PaginaInstituicao() {
  const { campanhas } = useContext(InstituicoesContext);
  const scrollRef = useRef<ScrollView | null>(null);
  let currentScrollPos = 0;

=======
import { router, useLocalSearchParams } from "expo-router";
import { InstituicoesContext } from "../../InstContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.82;
const CARD_MARGIN = 22;

export default function PaginaInstituicao() {
  const { instId } = useLocalSearchParams(); // <--- PEGA O ID CERTO

  const { insts } = useContext(InstituicoesContext);

  const inst = insts.find(i => String(i.id) === String(instId)) ?? null;

  const campanhas = Array.isArray(inst?.campanhas) ? inst.campanhas : [];

  const scrollRef = useRef<ScrollView | null>(null);

  let currentScrollPos = 0;
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
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
<<<<<<< HEAD
      params: { id: String(id) },
=======
      params: { id: String(id), instId: String(inst?.id) },
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#e9e6e6" />

<<<<<<< HEAD
      {/* --- CABEÇALHO --- */}
      <View style={styles.cabecalho}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>Olá, Instituição</Text>
          <Text style={styles.subtitulo}>GERENCIE SUAS CAMPANHAS</Text>
        </View>

        <FotoPerfilMock />
      </View>

      {/* --- SEARCH BAR --- */}
=======
      <View style={styles.cabecalho}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>Olá, {inst?.nome ?? "Instituição"}</Text>
          <Text style={styles.subtitulo}>GERENCIE SUAS CAMPANHAS</Text>
        </View>

        {/* FOTO DA INSTITUIÇÃO */}
        <View style={styles.fotoContainer}>
          {inst?.foto ? (
            <Image source={{ uri: inst.foto }} style={styles.perfilImage} />
          ) : (
            <Image source={require("../../assets/instituicao.png")} style={styles.perfilImage} />
          )}
        </View>
      </View>

>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7A9EB8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar voluntários ou doações"
          placeholderTextColor="#7A9EB8"
        />
      </View>

<<<<<<< HEAD
      {/* Título */}
      <View style={styles.instituicoesHeader}>
        <Text style={styles.instituicoesTitulo}>Minhas Campanhas Ativas</Text>
        <Text style={styles.verTudo}>Ver tudo</Text>
      </View>

      {/* --- CARROSSEL --- */}
=======
      <View style={styles.instituicoesHeader}>
        <Text style={styles.instituicoesTitulo}>Campanhas Ativas</Text>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/todasCampanhasInstituicao",
              params: { instId: String(inst?.id) },
            })
          }
        >
          <Text style={styles.verTudo}>Ver Todas</Text>
        </TouchableOpacity>
      </View>

>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
      <View style={styles.carrosselWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carrosselContainer}
          ref={scrollRef}
          scrollEnabled={false}
        >
<<<<<<< HEAD
          {mostradas.map(item => (
=======
          {mostradas.map((item: any) => (
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => abrirCampanha(item.id)}
            >
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.cardImage} />
              ) : (
<<<<<<< HEAD
                <Image
                  source={require("../../assets/instituicao.png")}
                  style={styles.cardImage}
                />
              )}

              {/* Info da campanha */}
              <View style={styles.campanhaInfo}>
                <Text style={styles.campanhaNome}>{item.nome}</Text>
                <Text style={styles.campanhaStatus}>Donando</Text>
                <Text style={styles.campanhaValor}>${item.valor ?? "0,000"}</Text>
=======
                <Image source={require("../../assets/instituicao.png")} style={styles.cardImage} />
              )}

              <View style={styles.campanhaOverlay}>
                <Text style={styles.campanhaNome}>{item.nome}</Text>
                <Text style={styles.campanhaStatus}>Doando agora</Text>
                <Text style={styles.campanhaValor}>R$ {item.valor ?? "0,00"}</Text>
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
              </View>
            </TouchableOpacity>
          ))}

          {mostradas.length === 0 && (
            <View style={[styles.card, { justifyContent: "center", alignItems: "center" }]}>
              <Text>Nenhuma campanha ativa</Text>
            </View>
          )}
        </ScrollView>

<<<<<<< HEAD
        {/* Botões laterais */}
=======
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
        <TouchableOpacity style={styles.arrowLeft} onPress={scrollLeft}>
          <Ionicons name="chevron-back-circle" size={30} color="#3D739C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.arrowRight} onPress={scrollRight}>
          <Ionicons name="chevron-forward-circle" size={30} color="#3D739C" />
        </TouchableOpacity>
      </View>
<<<<<<< HEAD
=======

      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={() =>
          router.push({
            pathname: "/cadastrarCampanha",
            params: { instId: String(inst?.id) },
          })
        }
      >
        <Text style={styles.botaoCadastrarTexto}>Cadastrar Nova Campanha</Text>
      </TouchableOpacity>
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(239, 237, 237)",
<<<<<<< HEAD
    paddingTop: 50,
=======
    paddingTop: 50
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  },

  cabecalho: {
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titulo: {
<<<<<<< HEAD
    color: "rgb(118, 161, 194)",
    fontSize: 24,
    fontWeight: "700",
=======
    color: "#76A1C2",
    fontSize: 24,
    fontWeight: "700"
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  },

  subtitulo: {
    color: "#7A9EB8",
    fontSize: 12,
    fontWeight: "600",
<<<<<<< HEAD
    marginTop: 3,
    letterSpacing: 0.5,
=======
    marginTop: 3
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
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
<<<<<<< HEAD
    resizeMode: "cover",
=======
    resizeMode: "cover"
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
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

<<<<<<< HEAD
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: "#021123" },
=======
  searchIcon: {
    marginRight: 10
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#021123"
  },
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9

  instituicoesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
<<<<<<< HEAD
    marginTop: 10,
=======
    marginTop: 10
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  },

  instituicoesTitulo: {
    fontSize: 27.3,
    fontWeight: "700",
<<<<<<< HEAD
    color: "#3D739C",
  },

  verTudo: { fontSize: 12, color: "#7A9EB8" },

  carrosselWrapper: { position: "relative", marginBottom: 20 },

  carrosselContainer: { paddingHorizontal: 20, paddingVertical: 10 },
=======
    color: "#3D739C"
  },

  verTudo: {
    fontSize: 12,
    color: "#7A9EB8"
  },
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9

  card: {
    width: CARD_WIDTH,
    height: 350,
<<<<<<< HEAD
    borderRadius: 15,
    overflow: "hidden",
    marginRight: CARD_MARGIN,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
=======
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: CARD_MARGIN / 2,
    backgroundColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  },

  cardImage: {
    width: "100%",
    height: "100%",
<<<<<<< HEAD
    resizeMode: "cover",
  },

  campanhaInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
  },

  campanhaNome: { fontSize: 17, fontWeight: "700", color: "#000" },
  campanhaStatus: { fontSize: 13, color: "#555" },
  campanhaValor: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3D739C",
    marginTop: 2,
=======
    resizeMode: "cover"
  },

  campanhaOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  campanhaNome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },

  campanhaStatus: {
    color: "#eaeaea",
    fontSize: 13
  },

  campanhaValor: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  },

  arrowLeft: {
    position: "absolute",
    top: "40%",
    left: 5,
    zIndex: 10,
<<<<<<< HEAD
    backgroundColor: "rgba(255,255,255,0.7)",
=======
    backgroundColor: "rgba(255,255,255,0.8)",
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
    borderRadius: 20,
    padding: 2,
  },

  arrowRight: {
    position: "absolute",
    top: "40%",
    right: 5,
    zIndex: 10,
<<<<<<< HEAD
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 2,
  },
=======
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 2,
  },

  textContainer: {
  },

  carrosselWrapper: {
  },

  carrosselContainer: {
    paddingHorizontal: 20,
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
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
});