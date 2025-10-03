import { router } from "expo-router";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Produtos() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de produtos</Text>

            <TouchableOpacity
             style={styles.button}
              onPress={() => { router.back() }}>

                <Text style={styles.titleButton}>Voltar</Text>

            </TouchableOpacity>

            <TouchableOpacity
             style={styles.button}
              onPress={() => { router.navigate({ pathname: '/product/[id]', params: { id: 123 } }) }}>

                <Text style={styles.titleButton}>Abrir Produto</Text>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8
    },
    titleButton: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
});