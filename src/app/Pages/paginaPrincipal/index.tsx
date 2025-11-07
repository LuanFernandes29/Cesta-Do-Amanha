import React, { useRef } from "react";
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
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Largura do card para cálculo da rolagem
const CARD_WIDTH = width * 0.8; 
const CARD_MARGIN = 20;

// Componente da Foto de Perfil (usa imagem local fototeste.jpg)
const FotoPerfilMock = () => (
    <View style={styles.fotoContainer}>
        <Image
            source={require("../../assets/fototeste.jpg")} // Caminho da imagem local
            style={styles.perfilImage}
        />
    </View>
);

// Dados para o Carrossel
const instituicoes = [
    { id: '1', imagem: 'https://images.pexels.com/photos/10364124/pexels-photo-10364124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, 
    { id: '2', imagem: 'https://images.pexels.com/photos/17235081/pexels-photo-17235081/free-photo-of-predios-arquitetura-edificios-escola.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: '3', imagem: 'https://images.pexels.com/photos/5966453/pexels-photo-5966453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

export default function PaginaPrincipal() {
    const scrollRef = useRef<ScrollView | null>(null);
    let currentScrollPos = 0;

    const scrollRight = () => {
        currentScrollPos += CARD_WIDTH + CARD_MARGIN;
        if (currentScrollPos > (instituicoes.length - 1) * (CARD_WIDTH + CARD_MARGIN)) {
            currentScrollPos = 0;
        }

        scrollRef.current?.scrollTo({
            x: currentScrollPos,
            animated: true,
        });
    };

    const scrollLeft = () => {
        currentScrollPos -= CARD_WIDTH + CARD_MARGIN;
        if (currentScrollPos < 0) currentScrollPos = 0;

        scrollRef.current?.scrollTo({
            x: currentScrollPos,
            animated: true,
        });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="dark-content" backgroundColor="#e9e6e6" />
            
            {/* Cabeçalho */}
            <View style={styles.cabecalho}>
                <View style={styles.textContainer}>
                    <Text style={styles.titulo}>Olá, Jiara</Text>
                    <Text style={styles.subtitulo}>AJUDE COMO PUDER</Text>
                </View>

                <FotoPerfilMock />
            </View>

            {/* Barra de pesquisa */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#7A9EB8" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Procure por campanhas"
                    placeholderTextColor="#7A9EB8"
                />
            </View>

            {/* Seção de instituições */}
            <View style={styles.instituicoesHeader}>
                <Text style={styles.instituicoesTitulo}>Principais Instituições</Text>
                <Text style={styles.verTudo}>Ver tudo</Text>
            </View>

            {/* Carrossel */}
            <View style={styles.carrosselWrapper}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carrosselContainer}
                    ref={scrollRef}
                    scrollEnabled={false}
                >
                    {instituicoes.map((instituicao) => (
                        <View key={instituicao.id} style={styles.card}>
                            <Image
                                source={{ uri: instituicao.imagem }}
                                style={styles.cardImage}
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Setas de navegação */}
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
        backgroundColor:"rgb(239, 237, 237)",
        paddingTop: 50,
    },
    cabecalho: {
        paddingHorizontal: 20,
        marginBottom: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {},
    titulo: {
        color:"rgb(118, 161, 194)",
        fontSize: 24,
        fontWeight: "700",
    },
    subtitulo: {
        color: "#7A9EB8",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 3,
        letterSpacing: 0.5,
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
    arrowLeft: {
        position: "absolute",
        top: "40%",
        left: 5,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 20,
        padding: 2,
    },
    arrowRight: {
        position: "absolute",
        top: "40%",
        right: 5,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 20,
        padding: 2,
    },
});
