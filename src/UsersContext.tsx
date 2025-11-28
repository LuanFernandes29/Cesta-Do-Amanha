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
      { ...u, id: Date.now(), tipo: "voluntario" }
    ]);
  }

  function login(email, senha) {
    const found = users.find(u => u.email === email && u.senha === senha);
    if (found) {
      setCurrentUser(found);
      return found;
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
