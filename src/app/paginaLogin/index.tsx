<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> d59fae3bdf757a6fcc009e5e5c31c7c13074d61b
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
import { Botao } from "@/componentes/Botao";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function PaginaLogin() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Bem vindo{"\n"} ao Cesta {"\n"} do amanhã</Text>
            <Botao onPress={()=> router.navigate("/cadastroInst")} title="Instituição" />
            <Text>Realize o login para acessar sua conta</Text>
            <Botao onPress={()=> router.navigate("/cadastro")} title="Voluntario" />
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
<<<<<<< HEAD
    },
   
=======
    }
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
})