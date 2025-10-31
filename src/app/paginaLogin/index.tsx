
import { Botao } from "@/componentes/Botao";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function PaginaLogin() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Bem vindo{"\n"} ao Cesta {"\n"} do amanhã</Text>
            <Botao onPress={()=> router.navigate("/cadastroInst")} title="Instituição" /> {/*caso de erro tirar o /index, sem ele da erro para subir github*/}
            <Text>Realize o login para acessar sua conta</Text>
            <Botao onPress={()=> router.navigate("/cadastro")} title="Voluntario" /> {/*caso de erro tirar o /index*/}
            <Text>Faça o cadastro se for sua primeira vez</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#457b9d',
    },
    title: {
        fontSize: 55,
        textAlign: 'center',
        fontWeight: 'bold',
    },
   
})