import { useState, useContext } from "react";
import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
<<<<<<< HEAD
import { UsersContext } from "../../UsersContext";

export default function Login() {
    const { login } = useContext(UsersContext);
=======

import { UsersContext } from "../../UsersContext";
import { InstituicoesContext } from "../../InstContext";

export default function Login() {
    const { login } = useContext(UsersContext);
    const { insts } = useContext(InstituicoesContext);
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function VerifyLogin() {
<<<<<<< HEAD
        const ok = login(email, senha);

        if (ok) {
            router.navigate("/paginaPrincipal");
        } else {
            alert("Email ou senha incorretos!");
        }
    }
=======
        const user = login(email, senha, insts);

        if (!user) {
            alert("Email ou senha incorretos!");
            return;
        }

        // SE FOR INSTITUIÇÃO
        if (user.tipo === "instituicao") {
            router.push({
                pathname: "/paginaPrincipalInstituicao",
                params: { instId: String(user.id) }  // 🔥 AQUI AGORA ESTÁ CERTO
            });
            return;
        }

        // SE FOR VOLUNTÁRIO
        router.navigate("/paginaPrincipal");
    }
    console.log("INSTS:", insts);
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cesta do amanhã</Text>
            <Text style={styles.subTitle}>Entrar</Text>
<<<<<<< HEAD
            <StatusBar/>
            <View style={styles.branco}>
                <Text style={styles.textDados}>EMAIL:</Text>
=======
            <StatusBar />
            <View style={styles.branco}>
                <Text style={styles.textDados}>EMAIL</Text>
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
                <TextInput
                    style={styles.inputText}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />

<<<<<<< HEAD
                <Text style={styles.textDados}>SENHA:</Text>
=======
                <Text style={styles.textDados}>SENHA</Text>
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    onChangeText={setSenha}
                />

                <Pressable style={styles.button} onPress={VerifyLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );
}

<<<<<<< HEAD
=======

>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#457b9d" },
    title: { fontSize: 40, fontWeight: "bold", color: "#fff" },
    subTitle: { fontSize: 15, color: "#fff", marginBottom: 20 },
    branco: { backgroundColor: "#fff", padding: 20, borderRadius: 20, width: "85%" },
    textDados: { marginLeft: 10, marginTop: 10 },
    inputText: { backgroundColor: "#D3D3D3", borderRadius: 10, padding: 10, fontSize: 18, marginTop: 5 },
    button: { backgroundColor: "#feb06a", padding: 12, marginTop: 20, borderRadius: 10, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
});
