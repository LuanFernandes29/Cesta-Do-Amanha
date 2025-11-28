import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const InstituicoesContext = createContext({
  insts: [],
  addInst: (inst: any) => {},
  addCampanha: (instId: any, campanha: any) => {},
  removeCampanha: (instId: any, campanhaId: any) => {},
  getById: (id: any) => null,
});

export function InstituicoesProvider({ children }: any) {
  const [insts, setInsts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const saved = await AsyncStorage.getItem("@insts");
      if (saved) setInsts(JSON.parse(saved));
    }
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@insts", JSON.stringify(insts));
  }, [insts]);

  function addInst(inst: any) {
    setInsts(prev => [
      ...prev,
      { 
        ...inst, 
        id: Date.now().toString(), // Cria ID único
        campanhas: [] 
      }
    ]);
  }

  // 🔥 FUNÇÃO ÚNICA E OFICIAL PARA REMOVER CAMPANHA
  function removeCampanha(instId: any, campanhaId: any) {
    setInsts(prev =>
      prev.map(inst =>
        String(inst.id) === String(instId)
          ? {
              ...inst,
              campanhas: inst.campanhas.filter(
                c => String(c.id) !== String(campanhaId)
              ),
            }
          : inst
      )
    );
  }

  function addCampanha(instId: any, campanha: any) {
    setInsts(prev =>
      prev.map(i =>
        String(i.id) === String(instId)
          ? { ...i, campanhas: [...(i.campanhas || []), campanha] }
          : i
      )
    );
  }

  function getById(id: any) {
    return insts.find(i => String(i.id) === String(id)) || null;
  }

  return (
    <InstituicoesContext.Provider
      value={{ insts, addInst, addCampanha, removeCampanha, getById }}
    >
      {children}
    </InstituicoesContext.Provider>
  );
}
