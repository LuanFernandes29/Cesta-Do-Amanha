<<<<<<< HEAD
=======
import { InstituicoesProvider } from '@/InstContext';
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { UsersProvider } from "../UsersContext";
<<<<<<< HEAD
import { InstituicoesProvider } from '@/InstContext';

=======
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9

export default function Layout() {
  return (
    <UsersProvider>
      <InstituicoesProvider>
        <Drawer
          screenOptions={
            {
              headerStyle: { backgroundColor: '#457b9d' },
              headerTintColor: '#fff',
            }
          }>
<<<<<<< HEAD
          <Drawer.Screen name="index" options={{ title: 'Login', headerShown: false }} />
=======

          <Drawer.Screen name="index" options={{ title: '', headerShown: false,  drawerItemStyle: { display: 'none' }}}/>
          <Drawer.Screen name="paginaPrincipal/index" options={{ title: 'Página Principal', headerShown: true }}/>
          <Drawer.Screen name="doacoes/index" options={{ title: 'Doação', headerShown: true }}/>
          <Drawer.Screen name="instituicaoDoador/index" options={{ title: '', headerShown: true, drawerItemStyle: { display: 'none'}}}/>
          <Drawer.Screen name="paginaPrincipalInstituicao/index" options={{ title: 'Instituição', headerShown: true }}/>
          <Drawer.Screen name="cadastrarCampanha/index" options={{ title: '', headerShown: true, drawerItemStyle: { display: 'none'} }}/>
          <Drawer.Screen name="todasCampanhasInstituicao/index" options={{ title: '', headerShown: false, drawerItemStyle: { display: 'none'} }}/>

>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
          <Drawer.Screen
            name='paginaLogin/index'
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
                  onPress={() => router.back()}
                />
              )
            }}
          />
          <Drawer.Screen
<<<<<<< HEAD
            name='cadastro/index'
=======
            name='cadastro/index' // Cadastro de Usuário (Pessoa Física)
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
<<<<<<< HEAD
                  onPress={() => router.back()}
=======
                  onPress={() => router.replace('/')}
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
                />
              )
            }}
          />
          <Drawer.Screen
<<<<<<< HEAD
            name='cadastroInst/index'
=======
            name='cadastroInst/index' // Cadastro de Instituição
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
<<<<<<< HEAD
                  onPress={() => router.back()}
=======
                  onPress={() => router.replace('/')}
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
                />
              )
            }}
          />
          <Drawer.Screen
            name='login/index'
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
                  onPress={() => router.back()}
                />
              )
            }}
          />
<<<<<<< HEAD
        
=======

>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
          <Drawer.Screen
            name='recuperar/index'
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
                  onPress={() => router.navigate('/login')}
                />
<<<<<<< HEAD
        
=======
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
              )
            }}
          />
        </Drawer>
      </InstituicoesProvider>
    </UsersProvider>
  );
}