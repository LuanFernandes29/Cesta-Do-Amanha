import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    // Carrega usuários e usuário logado ao iniciar
    useEffect(() => {
        async function loadData() {
            const savedUsers = await AsyncStorage.getItem("@users");
            const savedCurrent = await AsyncStorage.getItem("@currentUser");

            if (savedUsers) {
                const parsedUsers = JSON.parse(savedUsers);
                console.log("🔥 USERS CARREGADOS:", parsedUsers);
                setUsers(parsedUsers);
            }

            if (savedCurrent) {
                const parsedCurrent = JSON.parse(savedCurrent);
                console.log("🔥 USUÁRIO LOGADO CARREGADO:", parsedCurrent);
                setCurrentUser(parsedCurrent);
            }
        }
        loadData();
    }, []);

    // Salva usuários quando a lista muda
    useEffect(() => {
        AsyncStorage.setItem("@users", JSON.stringify(users)).then(() => {
            console.log("💾 USERS SALVOS:", users);
        });
    }, [users]);

    // Salva usuário logado
    useEffect(() => {
        AsyncStorage.setItem("@currentUser", JSON.stringify(currentUser)).then(() => {
            console.log("👤 USUÁRIO LOGADO AGORA:", currentUser);
        });
    }, [currentUser]);

    function addUser(user) {
        console.log("➕ ADICIONANDO USER:", user);
        setUsers(prev => [...prev, user]);
    }

    function login(email, senha) {
        const userFound = users.find(
            u => u.email === email && u.senha === senha
        );

        if (userFound) {
            console.log("🔓 LOGIN BEM-SUCEDIDO PARA:", userFound);
            setCurrentUser(userFound);
            return true;
        }

        console.log("❌ LOGIN FALHOU — email ou senha inválidos.");
        return false;
    }

    function logout() {
        console.log("🚪 LOGOUT — usuário saiu:", currentUser);
        setCurrentUser(null);
    }

    return (
        <UsersContext.Provider value={{ users, currentUser, addUser, login, logout }}>
            {children}
        </UsersContext.Provider>
    );
}
