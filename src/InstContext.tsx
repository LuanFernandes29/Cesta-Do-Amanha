import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definição de Tipos para TSX
type Campanha = { id: string; titulo: string;[key: string]: any };
type Instituicao = { id: string; email: string; senha: string; campanhas: Campanha[];[key: string]: any };
type InstContextType = {
  insts: Instituicao[];
  // ✅ CORREÇÃO: addInst agora retorna a Instituicao recém-criada
  addInst: (inst: Omit<Instituicao, 'id' | 'campanhas'>) => Instituicao;
  addCampanha: (instId: string, campanha: Campanha) => void;
  removeCampanha: (instId: string, campanhaId: string) => void;
  getById: (id: string) => Instituicao | null;
};

// Valor inicial do Context
export const InstituicoesContext = createContext<InstContextType>({
  insts: [],
  addInst: () => ({} as Instituicao), // Valor mock para o retorno
  addCampanha: () => { },
  removeCampanha: () => { },
  getById: () => null,
});

export function InstituicoesProvider({ children }: { children: ReactNode }) {
  const [insts, setInsts] = useState<Instituicao[]>([]);

  useEffect(() => {
    async function load() {
      const saved = await AsyncStorage.getItem("@insts");
      if (saved) setInsts(JSON.parse(saved));
    }
    load();
  }, []);

  useEffect(() => {
    // Salva no AsyncStorage sempre que 'insts' for atualizado
    AsyncStorage.setItem("@insts", JSON.stringify(insts));
  }, [insts]);

  // ✅ Função Corrigida: Retorna a nova instituição para o fluxo de cadastro/login
  function addInst(inst: Omit<Instituicao, 'id' | 'campanhas'>): Instituicao {
    const newInst: Instituicao = {
      ...inst,
      id: Date.now().toString(), // Cria ID único (string)
      campanhas: []
    };

    setInsts(prev => [
      ...prev,
      newInst
    ]);

    // Retorna o objeto completo imediatamente
    return newInst;
  }

  // FUNÇÃO ÚNICA E OFICIAL PARA REMOVER CAMPANHA
  function removeCampanha(instId: string, campanhaId: string) {
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

  function addCampanha(instId: string, campanha: Campanha) {
    setInsts(prev =>
      prev.map(i =>
        String(i.id) === String(instId)
          ? { ...i, campanhas: [...(i.campanhas || []), campanha] }
          : i
      )
    );
  }

  function getById(id: string): Instituicao | null {
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