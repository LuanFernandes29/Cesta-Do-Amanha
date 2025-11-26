import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const InstituicoesContext = createContext({
  insts: [],
  addInst: (inst: any) => {},
  getById: (id: any) => null,
});

export function InstituicoesProvider({ children }: any) {
  const [insts, setInsts] = useState<any[]>([]);

  // carrega do storage ao iniciar
  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem("@insts");
        if (saved) {
          const parsed = JSON.parse(saved);
          console.log("🔥 INSTS CARREGADAS DO STORAGE:", parsed);
          setInsts(parsed);
        } else {
          console.log("🔍 Nenhuma instituicao no storage ainda.");
        }
      } catch (err) {
        console.warn("Erro ao carregar insts:", err);
      }
    }
    load();
  }, []);

  // salva sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem("@insts", JSON.stringify(insts))
      .then(() => console.log("💾 INSTS SALVAS:", insts))
      .catch(err => console.warn("Erro ao salvar insts:", err));
  }, [insts]);

  function addInst(inst: any) {
    setInsts(prev => [...prev, inst]);
  }

  function getById(id: any) {
    return insts.find(i => String(i.id) === String(id)) || null;
  }

  return (
    <InstituicoesContext.Provider value={{ insts, addInst, getById }}>
      {children}
    </InstituicoesContext.Provider>
  );
}
