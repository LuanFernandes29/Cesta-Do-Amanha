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
const CARD_WIDTH = width * 0.8;
const CARD_MARGIN = 20;

const FotoPerfilMock = () => (
  <View style={styles.fotoContainer}>
    <Image source={require("../../assets/fototeste.jpg")} style={styles.perfilImage} />
  </View>
);

export default function PaginaInstituicao() {
  // ✅ CORREÇÃO APLICADA: Valor padrão de array vazio [] para evitar erro 'slice of undefined'
  const { campanhas = [] } = useContext(InstituicoesContext);
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
      params: { id: String(id) },
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#e9e6e6" />

      {/* --- CABEÇALHO --- */}
      <View style={styles.cabecalho}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>Olá, Instituição</Text>
          <Text style={styles.subtitulo}>GERENCIE SUAS CAMPANHAS</Text>
        </View>

        <FotoPerfilMock />
      </View>

      {/* --- SEARCH BAR --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7A9EB8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar voluntários ou doações"
          placeholderTextColor="#7A9EB8"
        />
      </View>

      {/* Título */}
      <View style={styles.instituicoesHeader}>
        <Text style={styles.instituicoesTitulo}>Minhas Campanhas Ativas</Text>
        <Text style={styles.verTudo}>Ver tudo</Text>
      </View>

      {/* --- CARROSSEL --- */}
      <View style={styles.carrosselWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carrosselContainer}
          ref={scrollRef}
          scrollEnabled={false}
        >
          {mostradas.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => abrirCampanha(item.id)}
            >
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.cardImage} />
              ) : (
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
              </View>
            </TouchableOpacity>
          ))}

          {mostradas.length === 0 && (
            <View style={[styles.card, { justifyContent: "center", alignItems: "center" }]}>
              <Text>Nenhuma campanha ativa</Text>
            </View>
          )}
        </ScrollView>

        {/* Botões laterais */}
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
  // ... (seus estilos aqui) ...
  container: {
    flex: 1,
    backgroundColor: "rgb(239, 237, 237)",
    paddingTop: 50,
  },
  // ... (seus estilos aqui) ...
  cabecalho: {
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // ... (restante dos estilos) ...
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