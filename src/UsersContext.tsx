import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InstituicoesContext } from "./InstContext";

type User = {
  id: string;
  email: string;
  senha: string;
  tipo: "voluntario" | "instituicao";
  nome?: string;
  foto?: string;
  campanhas?: any[];
  [key: string]: any;
};

type UsersContextType = {
  users: User[];
  currentUser: User | null;
  addUser: (data: Omit<User, "id" | "tipo">) => Promise<void>;
  login: (email: string, senha: string) => User | null;
  logout: () => void;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  currentUser: null,
  addUser: async () => {},
  login: () => null,
  logout: () => {},
});

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const { insts } = useContext(InstituicoesContext);

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadAll() {
      const storedUsers = await AsyncStorage.getItem("@users");
      const volunteers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const instUsers: User[] = insts.map(inst => ({
        ...inst,
        tipo: "instituicao",
      }));

      setUsers([...volunteers, ...instUsers]);
    }

    loadAll();
  }, [insts]);

  async function addUser(data: Omit<User, "id" | "tipo">) {
    const newUser: User = {
      ...data,
      id: Date.now().toString(),
      tipo: "voluntario",
    };

    const volunteers = users.filter(u => u.tipo === "voluntario");
    const updated = [...volunteers, newUser];

    await AsyncStorage.setItem("@users", JSON.stringify(updated));
    setUsers([...updated, ...users.filter(u => u.tipo === "instituicao")]);
    setCurrentUser(newUser);
  }

  function login(email: string, senha: string) {
    const found = users.find(
      u => u.email === email && u.senha === senha
    );

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
    <UsersContext.Provider
      value={{ users, currentUser, addUser, login, logout }}
    >
      {children}
    </UsersContext.Provider>
  );
}
