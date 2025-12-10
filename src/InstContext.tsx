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

  async function addInst(inst: any) {
    const novas = [...insts, inst];
    await salvarInstituicoes(novas);
  }

  function addCampanha(instId: any, campanha: any) {
    const novas = insts.map(inst =>
      String(inst.id) === String(instId)
        ? {
            ...inst,
            campanhas: [...(inst.campanhas || []), campanha],
          }
        : inst
    );

    salvarInstituicoes(novas);
  }

  function removeCampanha(instId: any, campanhaId: any) {
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
        addCampanha,
        removeCampanha,
      }}
    >
      {children}
    </InstituicoesContext.Provider>
  );
}
