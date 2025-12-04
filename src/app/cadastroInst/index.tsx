import { useState, useContext, useCallback } from "react";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View, Image, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import { InstituicoesContext } from "../../InstContext"; 

export default function Cadastro() {

    const { addInst } = useContext(InstituicoesContext);

    // Estados do Formulário (Todos mapeados para os campos)
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [cpfResp, setCpfResp] = useState("");
    const [foto, setFoto] = useState(null);

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
            foto: foto || null,
            tipo: "instituicao",
        };

        addInst(newInst);

        console.log("🎉 INSTITUIÇÃO CADASTRADA:", newInst);

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
    );
}

const styles = StyleSheet.create({
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