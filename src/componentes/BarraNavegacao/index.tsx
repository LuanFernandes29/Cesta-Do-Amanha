import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const BarraNavegacao = () => {
    const aoDoar = () => { console.log('Botão Doar pressionado!') }
    const aoVoltar = () => { console.log('Botão Voltar pressionado!') }

    return (

        <View style={styles.container}>

            {/* Cabeçalho Fixo (Sobreposto) */}
            <View>
                <TouchableOpacity onPress={aoVoltar} style={styles.iconeBotao}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Botão Doar Fixo (Posicionado Acima da Tab Bar) */}
            <View style={styles.botaoDoarWrapper}>
                <TouchableOpacity style={styles.botaoDoar} onPress={aoDoar}>
                    <Text style={styles.botaoDoarTexto}>Doar</Text>
                    <Ionicons name="send" size={16} color="#FFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

            {/* Barra de Navegação Inferior (Tab Bar) */}
            <View style={styles.tabBar}>
                <TouchableOpacity><Ionicons name="home-outline" size={30} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="list-outline" size={30} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="medal-outline" size={30} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="hand-right-outline" size={30} color="#000" /></TouchableOpacity>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },

    iconeBotao: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 15,
        opacity: 0.8,
    },

    botaoDoarWrapper: {
        position: 'absolute',
        bottom: 85, 
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    
    botaoDoar: {
        backgroundColor: '#333',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoDoarTexto: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});
