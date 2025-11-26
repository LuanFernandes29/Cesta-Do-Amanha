import { router } from "expo-router";
import { useState, useContext } from "react";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { UsersContext } from "../../UsersContext";

export default function Cadastro() {

    const { addUser } = useContext(UsersContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');

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
        <View style={styles.container}>
            <Text style={styles.title}>Cesta do amanhã</Text>
            <Text style={styles.subTitle}>Insira seus dados e junte-se {"\n"}a nós</Text>
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
    );
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
    subTitle: {
        fontSize: 15,
        textAlign: 'center'
    },
    branco: {
        marginTop: 20,
        gap: 5,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: '85%',
        height: '78%'
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
        fontSize: 22,
        width: '90%',
        height: '7.5%',
        padding: 10,
        margin: 10
    },
    button: {
        marginLeft: 38,
        backgroundColor: '#feb06a',
        width: '80%',
        margin: 10,
        padding: 10,
        borderRadius: 12,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    }
});
