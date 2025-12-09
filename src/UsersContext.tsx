import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InstituicoesContext } from "../src/InstContext";

// Definição de tipos (Simplificada)
type User = { id: string | number; email: string; senha: string; tipo: "voluntario" | "instituicao";[key: string]: any };
type UsersContextType = {
  users: User[];
  currentUser: User | null;
  addUser: (u: Omit<User, 'id' | 'tipo'>) => void;
  login: (email: string, senha: string) => User | null;
  logout: () => void;
};


export const UsersContext = createContext<UsersContextType>({
  users: [],
  currentUser: null,
  addUser: () => { },
  login: () => null,
  logout: () => { },
});

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Puxa SEMPRE a versão atualizada das instituições
  const { insts } = useContext(InstituicoesContext);

  useEffect(() => {
    async function load() {
      const u = await AsyncStorage.getItem("@users");
      const c = await AsyncStorage.getItem("@currentUser");

      if (u) setUsers(JSON.parse(u));
      if (c) setCurrentUser(JSON.parse(c));
    }
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    AsyncStorage.setItem("@currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  function addUser(u: Omit<User, 'id' | 'tipo'>) {
    setUsers(prev => [
      ...prev,
      { ...u, id: Date.now(), tipo: 'voluntario' } as User
    ]);
  }

  function login(email: string, senha: string): User | null {
    // 1. Verificar voluntário
    const foundUser = users.find(u => u.email === email && u.senha === senha);

    if (foundUser) {
      setCurrentUser({ ...foundUser, tipo: "voluntario" });
      return { ...foundUser, tipo: "voluntario" };
    }

    // 2. Verificar instituição
    const foundInst = insts.find((i: any) => i.email === email && i.senha === senha);

    if (foundInst) {
      const instUser = { ...foundInst, tipo: "instituicao" };
      setCurrentUser(instUser);
      return instUser as User;
    }

    return null;
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <UsersContext.Provider value={{ users, currentUser, addUser, login, logout }}>
      {children}
    </UsersContext.Provider>
  );
}