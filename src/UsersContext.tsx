import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UsersContext = createContext({
    users: [],
    addUser: () => {}
});

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);

    // 🔹 Carrega os usuários ao iniciar o app
    useEffect(() => {
        async function loadUsers() {
            const saved = await AsyncStorage.getItem("@users");
            if (saved) {
                setUsers(JSON.parse(saved));
            }
        }
        loadUsers();
    }, []);

    // 🔹 Salva sempre que o Array mudar
    useEffect(() => {
        AsyncStorage.setItem("@users", JSON.stringify(users));
        console.log("Usuários cadastrados:", users);
    }, [users]);

    // 🔹 Adiciona usuário
    function addUser(user) {
        setUsers(prev => [...prev, user]);
    }

    return (
        <UsersContext.Provider value={{ users, addUser }}>
            {children}
        </UsersContext.Provider>
    );
}
