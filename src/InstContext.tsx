import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const InstituicoesContext = createContext({
  insts: [],
  addInst: (inst: any) => {},
<<<<<<< HEAD
=======
  addCampanha: (instId: any, campanha: any) => {},
  removeCampanha: (instId: any, campanhaId: any) => {},
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  getById: (id: any) => null,
});

export function InstituicoesProvider({ children }: any) {
  const [insts, setInsts] = useState<any[]>([]);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    async function load() {
      const saved = await AsyncStorage.getItem("@insts");
      if (saved) setInsts(JSON.parse(saved));
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
    }
    load();
  }, []);

<<<<<<< HEAD
  // salva sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem("@insts", JSON.stringify(insts))
      .then(() => console.log("💾 INSTS SALVAS:", insts))
      .catch(err => console.warn("Erro ao salvar insts:", err));
  }, [insts]);

  function addInst(inst: any) {
    setInsts(prev => [...prev, inst]);
=======
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

  // FUNÇÃO ÚNICA E OFICIAL PARA REMOVER CAMPANHA
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
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
  }

  function getById(id: any) {
    return insts.find(i => String(i.id) === String(id)) || null;
  }

  return (
<<<<<<< HEAD
    <InstituicoesContext.Provider value={{ insts, addInst, getById }}>
      {children}
    </InstituicoesContext.Provider>
  );
}
=======
    <InstituicoesContext.Provider
      value={{ insts, addInst, addCampanha, removeCampanha, getById }}
    >
      {children}
    </InstituicoesContext.Provider>
  );
}
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
