import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { UsersProvider } from "../UsersContext";
import { InstituicoesProvider } from '@/InstContext';


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
          <Drawer.Screen name="index" options={{ title: 'Login', headerShown: false }} />
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
            name='cadastro/index'
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
            name='cadastroInst/index'
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