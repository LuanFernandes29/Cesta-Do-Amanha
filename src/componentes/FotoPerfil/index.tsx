import { Image, StyleSheet } from 'react-native'

export default function FotoPerfil() {
  return (
    <Image
      style={styles.imagemUsuario}
      source={require('../../assets/fototeste.jpg')}
    />
  )
}

const styles = StyleSheet.create({
  imagemUsuario: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
})
