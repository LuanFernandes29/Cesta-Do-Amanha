<<<<<<< HEAD
import { useState, useContext } from "react";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { InstituicoesContext } from "../../InstContext";
=======
import { useState, useContext, useCallback } from "react";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View, Image, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import { InstituicoesContext } from "../../InstContext"; 
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9

export default function Cadastro() {

    const { addInst } = useContext(InstituicoesContext);

<<<<<<< HEAD
=======
    // Estados do Formulário (Todos mapeados para os campos)
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [cpfResp, setCpfResp] = useState("");
    const [foto, setFoto] = useState(null);

<<<<<<< HEAD
    async function escolherFoto() {
=======
    // FUNÇÃO PARA ZERAR TODOS OS CAMPOS
    function resetForm() {
        setNome("");
        setEmail("");
        setSenha("");
        setCpfCnpj("");
        setCep("");
        setCpfResp("");
        setFoto(null);
        console.log("Formulário de cadastro resetado!");
    }

    // Limpa o formulário quando a tela perde o foco (ao clicar em Voltar)
    // Isso garante que, ao sair desta tela, os dados preenchidos serão zerados.
    useFocusEffect(
        useCallback(() => {
            // A função de retorno é executada quando a tela é desfocada (ex: ao Voltar)
            return () => {
                resetForm();
            };
        }, [])
    );

    async function escolherFoto() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissão da galeria para isso!');
            return;
        }

>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
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
<<<<<<< HEAD
            foto: foto || null, // FOTO OPCIONAL
            
=======
            foto: foto || null,
            tipo: "instituicao",
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
        };

        addInst(newInst);

        console.log("🎉 INSTITUIÇÃO CADASTRADA:", newInst);

<<<<<<< HEAD
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
=======
        router.push("/login"); 
    }

    return (
        // Envolvendo o conteúdo em ScrollView para permitir rolagem em telas pequenas
        <ScrollView contentContainerContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled"> 
            <View style={styles.container}>
                <Text style={styles.title}>Cesta do amanhã</Text>
                <Text style={styles.subTitle}>Insira seus dados e junte-se {"\n"}a nós</Text>
                <StatusBar/>

                <View style={styles.branco}>
                    <Text style={styles.textDadosNome}>NOME FANTASIA</Text>
                    <TextInput style={styles.inputText} value={nome} onChangeText={setNome}/>

                    <Text style={styles.textDados}>EMAIL</Text>
                    <TextInput 
                        style={styles.inputText} 
                        value={email} 
                        onChangeText={setEmail}
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        autoComplete="email"
                    />

                    <Text style={styles.textDados}>CRIE UMA SENHA</Text>
                    <TextInput 
                        style={styles.inputText} 
                        value={senha} 
                        onChangeText={setSenha}
                        autoCapitalize="none" 
                        secureTextEntry
                    />

                    <Text style={styles.textDados}>CPF OU CNPJ</Text>
                    <TextInput style={styles.inputText} value={cpfCnpj} onChangeText={setCpfCnpj}/>

                    <Text style={styles.textDados}>CEP</Text>
                    <TextInput style={styles.inputText} value={cep} onChangeText={setCep}/>

                    <Text style={styles.textDados}>CPF DO RESPONSÁVEL</Text>
                    <TextInput style={styles.inputText} value={cpfResp} onChangeText={setCpfResp}/>

                    <Pressable style={styles.fotoBtn} onPress={escolherFoto}>
                        <Text style={styles.fotoTxt}>{foto ? "Trocar Foto" : "Adicionar Foto"}</Text>
                    </Pressable>

                    {/* Exibe a imagem selecionada */}
                    {foto && (
                        <Image source={{ uri: foto }} style={styles.imagePreview} />
                    )}

                    <Pressable style={styles.button} onPress={cadastrar}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
    scrollContainer: { 
        flexGrow: 1, 
        justifyContent: 'center', 
        paddingVertical: 40,
        backgroundColor: '#457b9d' 
    },
    container: { 
        flex: 1, 
        alignItems: 'center', 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Ajusta para a StatusBar no Android
    },
    title: { 
        fontSize: 40, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: '#feb06a' 
    },
    subTitle:{ 
        fontSize: 15, 
        textAlign: 'center', 
        color: '#fff' 
    },
    branco:{ 
        marginTop: 20, 
        gap: 5, 
        backgroundColor: '#fff', 
        borderRadius: 25, 
        width: '90%', 
        paddingBottom: 20, 
        paddingHorizontal: 10,
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    textDadosNome:{ 
        marginLeft: 14, 
        marginTop: 20, 
        marginBottom: -10, 
        fontWeight: 'bold' 
    },
    textDados:{ 
        marginLeft: 14, 
        marginTop: 10, 
        marginBottom: -10, 
        fontWeight: 'bold' 
    },
    inputText: { 
        marginLeft: 8, 
        backgroundColor: '#D3D3D3', 
        borderRadius: 20, 
        fontSize: 16, 
        width: '95%', 
        height: 50, 
        paddingHorizontal: 15, 
        margin: 10 
    },
    fotoBtn: { 
        alignSelf: 'center', 
        backgroundColor: "#feb06a", 
        width: "90%", 
        padding: 15, 
        borderRadius: 12, 
        alignItems: "center", 
        marginTop: 15 
    },
    fotoTxt: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    imagePreview: { 
        width: 100, 
        height: 100, 
        alignSelf: "center", 
        borderRadius: 50,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#457b9d'
    },
    button:{ 
        alignSelf: 'center', 
        backgroundColor: '#feb06a', 
        width: '90%', 
        marginTop: 20, 
        padding: 15, 
        borderRadius: 12, 
        alignItems: 'center' 
    },
    buttonText:{ 
        fontSize: 20, 
        fontWeight: "bold", 
        color: "#fff" 
    }
});
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
