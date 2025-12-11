import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { InstituicoesContext } from "../../InstContext";

export default function CampanhaDoador() {
  const { instId: instIdParam, campanhaId: campanhaIdParam } = useLocalSearchParams() as {
    instId?: string;
    campanhaId?: string;
  };
  const { getById, insts } = useContext(InstituicoesContext);

  const instId = instIdParam ?? "";
  const campanhaId = campanhaIdParam ?? "";

  const [totalArrecadado, setTotalArrecadado] = useState<number>(0);

  // Sempre pega a inst atualizada do contexto
  const inst = getById(instId);
  const campanha = inst?.campanhas?.find(c => String(c.id) === campanhaId);

  useEffect(() => {
    if (campanha) {
      setTotalArrecadado(campanha.totalArrecadado || 0);
    }
  }, [insts, campanhaId]); // Re-render quando a lista de insts mudar

  if (!inst || !campanha) {
    return (
      <View style={styles.container}>
        <Text>Campanha não encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{campanha.nome}</Text>
      <Text style={styles.info}>Meta: R$ {campanha.valor}</Text>
      <Text style={styles.info}>Arrecadado: R$ {totalArrecadado}</Text>
      <Text style={styles.description}>
        {campanha.descricao ?? "Descrição não informada"}
      </Text>

      <TouchableOpacity
        style={styles.doarButton}
        onPress={() =>
          router.push({
            pathname: "/doacoes",
            params: { instId: String(inst.id), campanhaId: String(campanha.id) },
          })
        }
      >
        <Text style={styles.doarText}>Doar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#FFF" 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "700", 
    marginBottom: 10 
  },
  info: { 
    fontSize: 16, 
    marginBottom: 6 
  },
  description: { 
    fontSize: 15, 
    marginVertical: 12, 
    lineHeight: 22, 
    color: "#333" 
  },
  doarButton: {
    backgroundColor: "#2B6A80",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  doarText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
  }
});
