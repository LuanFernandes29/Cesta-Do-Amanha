import { useState, useContext } from "react";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { InstituicoesContext } from "../../InstContext";

export default function Cadastro() {

    const { addInst } = useContext(InstituicoesContext);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [cpfResp, setCpfResp] = useState("");
    const [foto, setFoto] = useState(null);

    async function escolherFoto() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    }

    function cadastrar() {
        const newInst = {
            id: Date.now(),
            nome,
            email,
            senha,
            cpfCnpj,
            cep,
            cpfResp,
            foto: foto || null, // FOTO OPCIONAL
            
        };

        addInst(newInst);

        console.log("🎉 INSTITUIÇÃO CADASTRADA:", newInst);

        router.push("/login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cesta do amanhã</Text>
            <Text style={styles.subTitle}>Insira seus dados e junte-se {"\n"}a nós</Text>
            <StatusBar/>

            <View style={styles.branco}>
                <Text style={styles.textDadosNome}>NOME FANTASIA</Text>
                <TextInput style={styles.inputText} value={nome} onChangeText={setNome}/>

                <Text style={styles.textDados}>EMAIL</Text>
                <TextInput style={styles.inputText} value={email} onChangeText={setEmail}
                    keyboardType="email-address" autoCapitalize="none" autoComplete="email"/>

                <Text style={styles.textDados}>CRIE UMA SENHA</Text>
                <TextInput style={styles.inputText} value={senha} onChangeText={setSenha}
                    autoCapitalize="none" secureTextEntry/>

                <Text style={styles.textDados}>CPF OU CNPJ</Text>
                <TextInput style={styles.inputText} value={cpfCnpj} onChangeText={setCpfCnpj}/>

                <Text style={styles.textDados}>CEP</Text>
                <TextInput style={styles.inputText} value={cep} onChangeText={setCep}/>

                <Text style={styles.textDados}>CPF DO RESPONSÁVEL</Text>
                <TextInput style={styles.inputText} value={cpfResp} onChangeText={setCpfResp}/>

                <Pressable style={styles.fotoBtn} onPress={escolherFoto}>
                    <Text style={styles.fotoTxt}>{foto ? "Trocar Foto" : "Adicionar Foto"}</Text>
                </Pressable>

                {foto && (
                    <Image source={{ uri: foto }} style={{ width: 100, height: 100, alignSelf: "center", borderRadius: 10 }} />
                )}

                <Pressable style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#457b9d' },
    title: { fontSize: 40, textAlign: 'center', fontWeight: 'bold' },
    subTitle:{ fontSize: 15, textAlign: 'center' },
    branco:{ marginTop: 20, gap: 5, backgroundColor: '#fff', borderRadius: 25, width: '85%', paddingBottom: 20 },
    textDadosNome:{ marginLeft: 24, marginTop: 20, marginBottom: -10 },
    textDados:{ marginLeft: 24, marginTop: 10, marginBottom: -10 },
    inputText: { marginLeft: 18, backgroundColor: '#D3D3D3', borderRadius: 20, fontSize: 18, width: '90%', height: 50, padding: 10, margin: 10 },
    fotoBtn: { marginLeft: 38, backgroundColor: "#feb06a", width: "80%", padding: 10, borderRadius: 12, alignItems: "center" },
    fotoTxt: { color: "#fff", fontWeight: "bold" },
    button:{ marginLeft: 38, backgroundColor: '#feb06a', width: '80%', marginTop: 10, padding: 10, borderRadius: 12, alignItems: 'center' },
    buttonText:{ fontSize: 20, fontWeight: "bold", color: "#fff" }
});
