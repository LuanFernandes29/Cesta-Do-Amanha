import { Image, StyleSheet, Text, View } from "react-native";

export default function InstituicaoDoador() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/instituicao.png")} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9e6e6',
        width: '100%',
        padding: 20,
    }

}) 