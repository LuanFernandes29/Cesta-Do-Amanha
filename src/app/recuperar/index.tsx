import { useRouter } from "expo-router";
import { useState } from "react";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "./firebase";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Recuperar(){

    const [ userMail, setUserMail ] = useState('');
    const router = useRouter();

    function recuperar() {
        alert("Email enviado!");
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Cesta do amanhã</Text>
            <Text style={styles.subTitle}>Recupere sua senha</Text>
            <View style={styles.branco}>
                <Text style={styles.textDados}>INFORME SEU EMAIL</Text>
                <TextInput style={styles.inputText}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={userMail}
                    onChangeText={setUserMail}
                />
                <Pressable style={styles.button} onPress={recuperar}> 
                    <Text style={styles.buttonText}>Enviar</Text>
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
        borderRadius: 30,
        width: '85%',
        height: '25%',
    },
    textDados:{
        marginLeft: 24,
        marginTop: 20,
        marginBottom: -10,
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
});