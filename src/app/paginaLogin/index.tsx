import { Botao } from "@/componentes/Botao";
import { router } from "expo-router";
import { Text, View, StyleSheet, Platform } from "react-native";
// Importamos 'Platform' para lidar com a barra de status.


export default function Principal() {
    return (
        // O container principal ainda usa flex: 1 e flex-start para o título ir para o topo
        <View style={styles.container}>

            {/* VIEW DO TÍTULO: Fica no topo */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Cesta do amanhã</Text>
                <Text style={styles.subtitle}>Voluntaria-se</Text>
            </View>

            {/* NOVO CONTAINER: Envolve os botões e usa justifyContent: 'center' */}
            <View style={styles.contentContainer}>
                <Botao title="cadastro voluntario" onPress={() => router.navigate('/cadastro')}/>
                <Text style={styles.textCadastro}>Faça o cadastro como voluntário</Text>
                
                {/* Adicionando um espaço entre os blocos de cadastro */}
                <View style={{height: 20}} /> 
                
                <Botao title="cadastro instituição" onPress={()=> router.navigate('/cadastroInst')}/>
                <Text style={styles.textCadastro}>Faça o cadastro como instituição</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Mantém 'flex-start' para o alinhamento principal, empurrando o título para cima
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: '#457b9d',
        
        paddingTop: Platform.OS === 'android' ? 50 : 80, 
    },
    
    
    contentContainer: {
        flex: 1, // Faz com que ocupe todo o espaço vertical restante
        width: '100%',
        justifyContent: 'center', // Centraliza verticalmente todos os itens dentro dele
        alignItems: 'center', // Centraliza horizontalmente
        paddingHorizontal: 20, // Opcional: Adiciona padding horizontal para botões maiores
    },

    titleContainer: {
        marginBottom: 30, // Margem abaixo do título para separá-lo dos botões
    },

   title: { 
        fontSize: 40, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: '#feb06a' 
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 15,
        color: "#fff",
        marginBottom: 20
    
    },
    textCadastro: {
        marginTop: 5,
        marginBottom: 10,
        color: '#f1faee',
    }
})