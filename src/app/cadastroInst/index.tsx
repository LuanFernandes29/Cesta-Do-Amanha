import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";

export default function Cadastro(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Cesta do amanhã</Text>
            <Text style={styles.subTitle}>Insira seus dados e junte-se {"\n"}a nós</Text>
            <StatusBar/>
            <View style={styles.branco}>
                <Text style={styles.textDadosNome}>NOME FANTASIA</Text>
                    <TextInput style={styles.inputText}/>
                <Text style={styles.textDados}>EMAIL</Text>
                    <TextInput style={styles.inputText}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                <Text style={styles.textDados}>CRIE UMA SENHA</Text>
                    <TextInput style={styles.inputText}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                <Text style={styles.textDados}>CPF OU CNPJ</Text>
                    <TextInput style={styles.inputText}/>
                <Text style={styles.textDados}>CEP</Text>
                    <TextInput style={styles.inputText}/>
                <Text style={styles.textDados}>CPF DO RESPONSÁVEL</Text>
                    <TextInput style={styles.inputText}/>
                    <Pressable style={styles.button}>
                        <Text onPress={()=> router.navigate("/paginaPrincipal")} style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
            </View>
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
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle:{
        fontSize: 15,
        textAlign: 'center'
    },
    branco:{
        marginTop: 20,
        gap: 5,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: '85%',
        height: '78%'
    },
    textDadosNome:{
        marginLeft: 24,
        marginTop: 20,
        marginBottom: -10,
    },
    textDados:{
        marginLeft: 24,
        marginTop: 10,
        marginBottom: -10,
    },
    inputText: {
        marginLeft: 18,
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 22,
        width: '90%',
        height: '7.5%',
        padding: 10,
        margin: 10
    },
    button:{
        marginLeft: 38,
        backgroundColor: '#feb06a',
        width: '80%',
        margin: 10,
        padding: 10,
        borderRadius: 12,
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    }
})