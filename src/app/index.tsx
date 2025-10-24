import { Botao } from "@/componentes/Botao";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";


export default function Login() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Bem vindo{"\n"} ao Cesta {"\n"} do amanhã</Text>
            <Botao onPress={()=> router.navigate("/login")} title="Login" />
            <Text>Realize o login para acessar sua conta</Text>
            <Botao onPress={()=> router.navigate("/paginaLogin")} title="Cadastro" />
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
    }
})