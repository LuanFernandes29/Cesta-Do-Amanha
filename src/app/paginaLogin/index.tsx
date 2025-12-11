import { Botao } from "@/componentes/Botao";
import { router } from "expo-router";
import { Text, View, StyleSheet, Platform } from "react-native";
// Importamos 'Platform' para lidar com a barra de status.


export default function Principal() {
    return (
        <View style={styles.container}>

            {/* VIEW DO TÍTULO: Fica no topo */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Cesta do amanhã</Text>
                <Text style={styles.subtitle}>Voluntarie-se</Text>
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
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: '#457b9d',
        
        paddingTop: Platform.OS === 'android' ? 50 : 80, 
    },
    
    
    contentContainer: {
        flex: 1, 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 20, 
    },

    titleContainer: {
        marginBottom: 30, 
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