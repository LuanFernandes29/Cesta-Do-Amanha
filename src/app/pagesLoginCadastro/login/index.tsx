import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Cesta do amanhã</Text>
            <Text style={styles.subTitle}>Entrar</Text>
            <StatusBar/>
            <View style={styles.branco}>
                <Text style={styles.textDados}>EMAIL</Text>
                    <TextInput style={styles.inputText}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                <Text style={styles.textDados}>SENHA</Text>
                    <TextInput style={styles.inputText}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    <View style={styles.subContainer}>
                        <Pressable style={styles.subButton}
                        onPress={()=> router.navigate("/recuperar")}>
                            <Text style={styles.subTextButton}>
                                ESQUECEU SUA SENHA?
                            </Text>
                        </Pressable>
                    </View>
                    <Pressable style={styles.button}
                    onPress={()=> router.navigate("/paginaPrincipal")}>
                        <Text  
                            style={styles.buttonText}>
                            Entrar
                        </Text>
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
        height: '40%'
    },
    textDados:{
        marginLeft: 24,
        marginTop: 10,
        marginBottom: -10,
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    subButton:{
        padding: 10,
    },
    subTextButton:{
        color: '#8f8e8e'
    },
    inputText: {
        marginLeft: 18,
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 22,
        width: '90%',
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