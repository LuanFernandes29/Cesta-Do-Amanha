import { InstituicoesProvider } from "@/InstContext";
import { UsersProvider } from "../UsersContext";

import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";

function BackButton({ path }: { path: string }) {
  return (
    <Ionicons
      name="arrow-back"
      size={24}
      color="#fff"
      style={{ marginLeft: 16 }}
      onPress={() => router.navigate(path)}
    />
  );
}

export default function Layout() {
  return (
    <InstituicoesProvider>
      <UsersProvider>
        <Drawer
          screenOptions={{
            headerStyle: { backgroundColor: "#457b9d" },
            headerTintColor: "#fff",

            // 🚫 Remove hamburger globalmente
            headerLeft: () => null,
          }}
        >
          {/* ================= INÍCIO ================= */}
          <Drawer.Screen
            name="index"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />

          {/* ================= PRINCIPAIS ================= */}
          <Drawer.Screen
            name="paginaPrincipal/index"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="paginaPrincipalInstituicao/index"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />

          {/* ================= TELAS INTERNAS ================= */}
          <Drawer.Screen
            name="instituicaoDoador/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaPrincipal" />,
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="campanhaDoador/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaPrincipal" />,
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="todasinstituicoes/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaPrincipal" />,
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="perfilInst/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaPrincipalInstituicao" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="Perfil/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaPrincipal" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="campanhaDetalhes/index"
            options={{
              title: "",
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="doacoes/index"
            options={{
              title: "Doação",
              headerLeft: () => <BackButton path="/paginaPrincipal" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="cadastrarCampanha/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaPrincipalInstituicao" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="todasCampanhasInstituicao/index"
            options={{
              headerShown: false,
              headerLeft: () => <BackButton path="/paginaPrincipalInstituicao" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          {/* ================= AUTH ================= */}
          <Drawer.Screen
            name="login/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="paginaLogin/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="cadastro/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaLogin" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="cadastroInst/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/paginaLogin" />,
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="recuperar/index"
            options={{
              title: "",
              headerLeft: () => <BackButton path="/login" />,
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </UsersProvider>
    </InstituicoesProvider>
  );
}
