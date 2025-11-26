import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const BarraNavegacao = () => {
    const aoDoar = () => { console.log('Botão Doar pressionado!') }
    const aoVoltar = () => { console.log('Botão Voltar pressionado!') }

    return (

        <View style={styles.container}>

            {/* Cabeçalho Fixo (Sobreposto) */}
            <View>
                <TouchableOpacity onPress={aoVoltar} style={styles.iconeBotao}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Botão Doar Fixo (Posicionado Acima da Tab Bar) */}
            <View style={styles.botaoDoarWrapper}>
                <TouchableOpacity style={styles.botaoDoar} onPress={aoDoar}>
                    <Text style={styles.botaoDoarTexto}>Doar</Text>
                    <Ionicons name="send" size={16} color="#FFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

            {/* Barra de Navegação Inferior (Tab Bar) */}
            <View style={styles.tabBar}>
                <TouchableOpacity><Ionicons name="home-outline" size={30} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="list-outline" size={30} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="medal-outline" size={30} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="hand-right-outline" size={30} color="#000" /></TouchableOpacity>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },

    iconeBotao: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 15,
        opacity: 0.8,
    },

    botaoDoarWrapper: {
        position: 'absolute',
        bottom: 85, 
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    
    botaoDoar: {
        backgroundColor: '#333',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoDoarTexto: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});

// // import { Ionicons } from "@expo/vector-icons";
// import { StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";

// // O componente agora pode receber as funções de navegação como props
// interface BarraNavegacaoProps {
//     // Estas funções serão passadas pela tela que usar o componente (ex: InstituicaoDoador)
//     aoVoltar?: () => void;
//     aoDoar: () => void;
// }

// // Passamos as props para garantir que as ações sejam externas e funcionais
// export const BarraNavegacao = ({ aoVoltar, aoDoar }: BarraNavegacaoProps) => {

//     return (

//         // O CONTAINER FICA ABSOLUTO E COBRE TODA A TELA HOSPEDEIRA
//         <View style={styles.containerFixo}> 

//             {/* Cabeçalho Fixo (Sobreposto) - Renderizado apenas se a função for passada */}
//             {/* Adicionamos a View de Perfil para que o header tenha dois lados, como no design */}
//             {aoVoltar && (
//                 <View style={styles.header}>
//                     {/* Botão Voltar */}
//                     <TouchableOpacity onPress={aoVoltar} style={styles.iconeBotao}>
//                         <Ionicons name="arrow-back" size={28} color="#000" />
//                     </TouchableOpacity>
//                     {/* Ícone de Perfil/Usuário */}
//                     <TouchableOpacity style={styles.iconeBotao}>
//                         <Ionicons name="person-circle-outline" size={28} color="#000" />
//                     </TouchableOpacity>
//                 </View>
//             )}

//             {/* Botão Doar Fixo (Posicionado Acima da Tab Bar) */}
//             <View style={styles.containerBotaoDoar}>
//                 <TouchableOpacity style={styles.botaoDoar} onPress={aoDoar}>
//                     <Text style={styles.botaoDoarTexto}>Doar</Text>
//                     <Ionicons name="send" size={16} color="#FFF" style={{ marginLeft: 8 }} />
//                 </TouchableOpacity>
//             </View>

//             {/* Barra de Navegação Inferior (Tab Bar) */}
//             <View style={styles.tabBar}>
//                 <TouchableOpacity><Ionicons name="home-outline" size={30} color="#000" /></TouchableOpacity>
//                 <TouchableOpacity><Ionicons name="list-outline" size={30} color="#000" /></TouchableOpacity>
//                 <TouchableOpacity><Ionicons name="medal-outline" size={30} color="#000" /></TouchableOpacity>
//                 <TouchableOpacity><Ionicons name="hand-right-outline" size={30} color="#000" /></TouchableOpacity>
//             </View>
//         </View>
//     )
// };

// const styles = StyleSheet.create({
//     // --- NOVO CONTAINER PRINCIPAL FIXO ---
//     containerFixo: {
//         // ESSENCIAL: Garante que o componente flutue sobre o conteúdo da tela.
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         // ZIndex alto para ficar acima de todo o conteúdo da tela hospedeira.
//         zIndex: 100, 
//     },

//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         // Ajuste para a área de segurança (safe area) no iOS
//         paddingTop: Platform.OS === 'ios' ? 50 : 20, 
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 10, // ZIndex menor que o containerFixo
//         backgroundColor: 'transparent',
//     },

//     iconeBotao: {
//         backgroundColor: '#FFF',
//         padding: 5,
//         borderRadius: 15,
//         opacity: 0.8,
//     },

//     // Renomeado para containerBotaoDoar (melhor que botaoDoarWrapper)
//     containerBotaoDoar: {
//         position: 'absolute',
//         bottom: 85, // Posição acima da Tab Bar (70px) + espaçamento (15px)
//         left: 0,
//         right: 0,
//         alignItems: 'center',
//         zIndex: 10,
//     },
//     botaoDoar: {
//         backgroundColor: '#333',
//         paddingVertical: 15,
//         paddingHorizontal: 50,
//         borderRadius: 30,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         ...Platform.select({ // Adicionando sombra
//             ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, },
//             android: { elevation: 8, },
//         }),
//     },
//     botaoDoarTexto: {
//         color: '#FFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },

//     tabBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         height: 70,
//         backgroundColor: '#FFF',
//         borderTopWidth: 1,
//         borderTopColor: '#EEE',
//         position: 'absolute', // ESSENCIAL: Fica sempre no final
//         bottom: 0,
//         left: 0,
//         right: 0,
//         paddingBottom: Platform.OS === 'ios' ? 10 : 0, // Ajuste para a safe area
//     }
// });