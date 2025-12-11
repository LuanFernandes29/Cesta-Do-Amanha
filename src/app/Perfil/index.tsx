import { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UsersContext } from "../../UsersContext";

export default function Perfil() {
    const { currentUser, updateUser, logout } = useContext(UsersContext);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [foto, setFoto] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            router.replace("/login");
            return;
        }

        setNome(currentUser.nome || "");
        setEmail(currentUser.email || "");
        setFoto(currentUser.foto);
        setLoading(false);
    }, [currentUser]);

    if (loading) return null;

    async function escolherFoto() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    }

    async function salvar() {
        if (!nome || !email) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        await updateUser({
            ...currentUser!,
            nome,
            email,
            foto,
        });

        Alert.alert("Sucesso", "Perfil atualizado");
        router.navigate('/paginaPrincipal')
    }

    function sair() {
        Alert.alert("Sair", "Deseja realmente sair?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: () => {
                    logout();
                    router.replace("/login");
                },
            },
        ]);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Pressable style={styles.avatar} onPress={escolherFoto}>
                {foto ? (
                    <Image source={{ uri: foto }} style={styles.avatarImage} />
                ) : (
                    <Ionicons name="person" size={80} color="#fff" />
                )}
            </Pressable>

            <Text style={styles.titulo}>Meu Perfil</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome} />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <Pressable style={styles.btnSalvar} onPress={salvar}>
                    <Text style={styles.btnText}>Salvar Alterações</Text>
                </Pressable>

                <Pressable style={styles.btnLogout} onPress={sair}>
                    <Text style={styles.btnText}>Sair</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#457b9d",
        alignItems: "center",
        padding: 20,
    },

    avatar: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#7A9EB8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        overflow: "hidden",
    },

    avatarImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    titulo: {
        fontSize: 26,
        color: "#fff",
        fontWeight: "bold",
        marginVertical: 20,
    },

    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },

    label: {
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },

    input: {
        backgroundColor: "#e9e9e9",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
    },

    btnSalvar: {
        backgroundColor: "#feb06a",
        padding: 15,
        borderRadius: 12,
        marginTop: 20,
        alignItems: "center",
    },

    btnLogout: {
        backgroundColor: "#d62828",
        padding: 15,
        borderRadius: 12,
        marginTop: 15,
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
