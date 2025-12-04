import { InstituicoesProvider } from '@/InstContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { UsersProvider } from "../UsersContext";

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

          <Drawer.Screen name="index" options={{ title: '', headerShown: false,  drawerItemStyle: { display: 'none' }}}/>
          <Drawer.Screen name="paginaPrincipal/index" options={{ title: 'Página Principal', headerShown: true }}/>
          <Drawer.Screen name="doacoes/index" options={{ title: 'Doação', headerShown: true }}/>
          <Drawer.Screen name="instituicaoDoador/index" options={{ title: '', headerShown: true, drawerItemStyle: { display: 'none'}}}/>
          <Drawer.Screen name="paginaPrincipalInstituicao/index" options={{ title: 'Instituição', headerShown: true }}/>
          <Drawer.Screen name="cadastrarCampanha/index" options={{ title: '', headerShown: true, drawerItemStyle: { display: 'none'} }}/>
          <Drawer.Screen name="todasCampanhasInstituicao/index" options={{ title: '', headerShown: false, drawerItemStyle: { display: 'none'} }}/>

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
            name='cadastro/index' // Cadastro de Usuário (Pessoa Física)
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
                  onPress={() => router.replace('/')}
                />
              )
            }}
          />
          <Drawer.Screen
            name='cadastroInst/index' // Cadastro de Instituição
            options={{
              drawerItemStyle: { display: 'none' },
              title: '',
              headerLeft: () => (
                <Ionicons
                  name='arrow-back'
                  size={24}
                  color='#fff'
                  style={{ marginLeft: 16 }}
                  onPress={() => router.replace('/')}
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
              )
            }}
          />
        </Drawer>
      </InstituicoesProvider>
    </UsersProvider>
  );
}