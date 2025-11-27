import { router, useFocusEffect } from "expo-router"; // <-- Adicionado useFocusEffect
import { useState, useContext, useCallback } from "react"; // <-- Adicionado useCallback
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { UsersContext } from "../../UsersContext";

export default function Cadastro() {

    const { addUser } = useContext(UsersContext);

    // Estados do Formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');

    // 🌟 FUNÇÃO PARA ZERAR TODOS OS CAMPOS
    function resetForm() {
        setNome('');
        setEmail('');
        setSenha('');
        setCep('');
        setTelefone('');
        setNascimento('');
        console.log("Formulário de usuário resetado!");
    }

    // 💡 Hook para limpar o formulário quando a tela perde o foco (ao clicar em Voltar)
    useFocusEffect(
        useCallback(() => {
            // Retorna a função de limpeza que será executada quando a tela for desfocada/removida
            return () => {
                resetForm();
            };
        }, [])
    );

    function handleCadastro() {
        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            cep,
            telefone,
            nascimento,
        };

        addUser(novoUsuario);

        console.log("Usuário cadastrado:", novoUsuario);

        router.navigate("/login");
    }

    return (
        // Envolvendo em ScrollView para telas menores (necessário, pois View não rola)
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled"> 
            <View style={styles.container}>
                <Text style={[styles.title, { color: '#fff' }]}>Cesta do amanhã</Text>
                <Text style={[styles.subTitle, { color: '#fff' }]}>Insira seus dados e junte-se {"\n"}a nós</Text>
                <StatusBar />
                
                <View style={styles.branco}>
                    <Text style={styles.textDadosNome}>NOME</Text>
                    <TextInput 
                        style={styles.inputText}
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.textDados}>EMAIL</Text>
                    <TextInput 
                        style={styles.inputText}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.textDados}>CRIE UMA SENHA</Text>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <Text style={styles.textDados}>CEP</Text>
                    <TextInput 
                        style={styles.inputText}
                        value={cep}
                        onChangeText={setCep}
                    />

                    <Text style={styles.textDados}>TELEFONE</Text>
                    <TextInput 
                        style={styles.inputText}
                        value={telefone}
                        onChangeText={setTelefone}
                    />

                    <Text style={styles.textDados}>DATA DE NASCIMENTO</Text>
                    <TextInput 
                        style={styles.inputText}
                        value={nascimento}
                        onChangeText={setNascimento}
                    />

                    <Pressable 
                        style={styles.button}
                        onPress={handleCadastro}
                    >
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
        backgroundColor: '#457b9d',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40, // Adiciona padding para o topo
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 15,
        textAlign: 'center'
    },
    branco: {
        marginTop: 20,
        gap: 5,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: '90%', // Ajustei para 90% para caber melhor na tela
        paddingBottom: 20,
    },
    textDadosNome: {
        marginLeft: 24,
        marginTop: 20,
        marginBottom: -10,
    },
    textDados: {
        marginLeft: 24,
        marginTop: 10,
        marginBottom: -10,
    },
    inputText: {
        marginLeft: 18,
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 18, // Ajustei o tamanho da fonte para consistência
        width: '90%',
        height: 50, // Altura fixa para consistência
        paddingHorizontal: 15,
        margin: 10
    },
    button: {
        alignSelf: 'center', // Centraliza o botão
        backgroundColor: '#feb06a',
        width: '80%',
        marginTop: 20,
        padding: 15, // Aumentei o padding
        borderRadius: 12,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    }
});