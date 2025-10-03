import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Login(){
    return(
    <View style={styles.constainer}>
            
                <Text style={styles.title}>Bem vindo{"\n"} ao Cesta {"\n"} do amanhã</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
                <Text>Realize o login para acessar sua conta</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>Cadastro</Text>
                </TouchableOpacity>
                <Text>Faça o cadastro se for sua primeira vez</Text>
           
    </View>
    )
}
const styles = StyleSheet.create({
    constainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#457b9d',
    },
    title:{
        fontSize: 55,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button:{
        backgroundColor: '#feb06a',
        padding: 10,
        width: '75%',
        height: '6%',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    buttonTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    }
   
})