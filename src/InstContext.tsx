import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const InstituicoesContext = createContext({} as any);

export function InstituicoesProvider({ children }: any) {
  const [insts, setInsts] = useState<any[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const instsSalvas = await AsyncStorage.getItem("@instituicoes");
    if (instsSalvas) {
      setInsts(JSON.parse(instsSalvas));
    }
  }

  async function salvarInstituicoes(lista: any[]) {
    setInsts(lista);
    await AsyncStorage.setItem("@instituicoes", JSON.stringify(lista));
  }

  // Criar instituição
  async function addInst(inst: any) {
    const novaInst = {
      ...inst,
      id: Date.now().toString(),
      campanhas: [],
    };

    const novaLista = [...insts, novaInst];
    await salvarInstituicoes(novaLista);

    return novaInst;
  }

  // Buscar instituição por id
  function getById(id: string) {
    return insts.find(inst => String(inst.id) === String(id));
  }

  // ✅ Adicionar ou atualizar campanha
  function addCampanha(instId: string, campanha: any) {
    const novas = insts.map(inst => {
      if (String(inst.id) === String(instId)) {
        // Se já existe a campanha, atualiza
        const campanhasAtualizadas = inst.campanhas?.map((c: any) =>
          String(c.id) === String(campanha.id) ? campanha : c
        ) || [];

        // Se não existia ainda, adiciona
        const jaExiste = inst.campanhas?.some((c: any) => String(c.id) === String(campanha.id));
        const campanhasFinais = jaExiste ? campanhasAtualizadas : [...campanhasAtualizadas, campanha];

        return { ...inst, campanhas: campanhasFinais };
      } else {
        return inst;
      }
    });

    salvarInstituicoes(novas);
  }

  // Remover campanha
  function removeCampanha(instId: string, campanhaId: string) {
    const novas = insts.map(inst =>
      String(inst.id) === String(instId)
        ? {
          ...inst,
          campanhas: inst.campanhas.filter(
            (c: any) => String(c.id) !== String(campanhaId)
          ),
        }
        : inst
    );

    salvarInstituicoes(novas);
  }

  return (
    <InstituicoesContext.Provider
      value={{
        insts,
        addInst,
        getById,
        addCampanha,
        removeCampanha,
      }}
    >
      {children}
    </InstituicoesContext.Provider>
  );
}
