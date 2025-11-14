import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarraNavegacao } from '@/componentes/BarraNavegacao';

const institutionData = {
    name: 'Lar São Vicente',
    address: 'Rua Benjamim Monteiro, Pederneiras, SP - Brasil',
    description: 'O Lar São Vicente destina-se ao atendimento de pessoas idosas em regime de residência visando proporcionar atendimento integral com serviços destinados a promoção e proteção social, manutenção da saúde física, espiritual e emocional, cuidados pessoais e preservação do convívio sócio-familiar.',
    imageUrl: require("../../assets/instituicao.png"),
};

export default function InstituicaoDoador() {
    

    return (
        <View style={styles.container}>

            {/* 1. Área de Conteúdo Principal (ScrollView) */}
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollViewStyle}>

                {/* Imagem e Localização */}
                <View style={styles.imageContainer}>
                    <Image
                        source={institutionData.imageUrl}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    {/* Overlay de Localização */}
                    <View style={styles.locationOverlay}>
                        <Ionicons name="location" size={16} color="#FFF" style={{ marginRight: 5 }} />
                        <Text style={styles.locationText}>
                            {institutionData.address}
                        </Text>
                    </View>
                </View>

                {/* Descrição */}
                <View style={styles.descriptionArea}>
                    <Text style={styles.descriptionText}>
                        {institutionData.description}
                    </Text>
                </View>

                {/* Espaçamento extra no fim do ScrollView para o botão e tab bar */}
                <View style={{ height: 120 }} />
                <BarraNavegacao />

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    scrollViewStyle: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'transparent',
    },

    imageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    locationOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    locationText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },

    descriptionArea: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
    },

    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    }
});