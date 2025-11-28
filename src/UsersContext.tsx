import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UsersContext = createContext({
  users: [],
  currentUser: null,
  addUser: () => {},
  login: () => {},
  logout: () => {},
});

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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

  function addUser(u) {
    setUsers(prev => [
      ...prev,
      { ...u, id: Date.now() }
    ]);
  }

  function login(email, senha, insts) {
    // 1. Verificar voluntário
    const foundUser = users.find(u => u.email === email && u.senha === senha);

    if (foundUser) {
        setCurrentUser(foundUser);
        return { ...foundUser, tipo: "voluntario" };
    }

    // 2. Verificar instituição
    const foundInst = insts.find(i => i.email === email && i.senha === senha);

    if (foundInst) {
        setCurrentUser(foundInst);
        return { ...foundInst, tipo: "instituicao" };
    }

    // Nenhum encontrado
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
