import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Dimensions,
} from "react-native";
import FotoPerfil from "../../componentes/FotoPerfil";

const { width, height } = Dimensions.get("window");

export default function PaginaPrincipal() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.cabecalho}>
                    <View style={styles.textContainer}>
                        <Text style={styles.titulo}>Olá, Jiara</Text>
                        <Text style={styles.subtitulo}>AJUDE COMO PUDER</Text>
                    </View>

                    <View style={styles.fotoContainer}>
                        <FotoPerfil />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#e9e6e6",
    },

    container: {
        flex: 1,
        backgroundColor: "#e9e6e6",
        paddingTop: StatusBar.currentHeight || 0, // Garante espaçamento em Android
    },

    cabecalho: {
        backgroundColor: "#EDEAEA",
        paddingHorizontal: width * 0.05, // 5% da largura
        paddingVertical: height * 0.03, // 3% da altura
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2, // sombra no Android
        shadowColor: "#000", // sombra no iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    textContainer: {
        flex: 1,
    },

    titulo: {
        color: "#3D739C",
        fontSize: width * 0.065, // tamanho ajustável com a tela
        fontWeight: "700",
    },

    subtitulo: {
        color: "#7A9EB8",
        fontSize: width * 0.03,
        fontWeight: "600",
        marginTop: 3,
        letterSpacing: 0.5,
    },

    fotoContainer: {
        backgroundColor: "#4E86A6",
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: width * 0.07,
        justifyContent: "center",
        alignItems: "center",
    },
});
