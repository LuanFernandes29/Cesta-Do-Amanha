import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { InstituicoesContext } from "../../InstContext";

export default function Doacoes() {
  const { instId, campanhaId } = useLocalSearchParams() as { instId?: string; campanhaId?: string };
  const { getById, addCampanha, removeCampanha } = useContext(InstituicoesContext);

  const inst = instId ? getById(instId) : null;
  const campanha = inst?.campanhas?.find(c => String(c.id) === String(campanhaId));

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  if (!campanha) return <Text>Campanha não encontrada</Text>;

  const total =
    selectedAmount !== null ? selectedAmount : customAmount ? parseFloat(customAmount) : 0;

  const handleDoacao = () => {
    if (!total || total <= 0) {
      Alert.alert("Erro", "Informe um valor válido para doação");
      return;
    }

    const novoTotal = (campanha.totalArrecadado || 0) + total;

    // Atualiza campanha no contexto
    addCampanha(inst.id, { ...campanha, totalArrecadado: novoTotal });

    Alert.alert("Doação realizada", `Você doou R$ ${total}`);
    
    // Fecha ou redireciona explicitamente
    router.navigate('/paginaPrincipal');

    // Remove se meta atingida
    if (novoTotal >= campanha.valor) {
      removeCampanha(inst.id, campanha.id);
      Alert.alert("Campanha concluída", "A campanha atingiu a meta e foi encerrada.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Quanto você deseja doar?</Text>

      <View style={styles.amountContainer}>
        {[10, 25, 50, 100, 200].map(amount => (
          <TouchableOpacity
            key={amount}
            style={[styles.amountButton, selectedAmount === amount && styles.amountButtonSelected]}
            onPress={() => {
              setSelectedAmount(amount);
              setCustomAmount("");
            }}
          >
            <Text style={[styles.amountText, selectedAmount === amount && styles.amountTextSelected]}>
              R${amount},00
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.amountButton, customAmount !== "" && styles.amountButtonSelected]}
          onPress={() => setSelectedAmount(null)}
        >
          <Text style={[styles.amountText, customAmount !== "" && styles.amountTextSelected]}>
            Quantia personalizada
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Valor total da doação:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        editable={selectedAmount === null}
        value={selectedAmount ? `R$${selectedAmount},00` : customAmount}
        onChangeText={setCustomAmount}
      />

      <TouchableOpacity style={styles.doarButton} onPress={handleDoacao}>
        <Text style={styles.doarText}>Confirmar Doação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5", alignItems: "center" },
  label: { fontSize: 14, fontWeight: "600", alignSelf: "flex-start", marginVertical: 10 },
  amountContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  amountButton: { backgroundColor: "#E0E0E0", borderRadius: 8, padding: 10, margin: 5 },
  amountButtonSelected: { backgroundColor: "#2B6A80" },
  amountText: { color: "#333" },
  amountTextSelected: { color: "#fff" },
  input: { backgroundColor: "#fff", width: "90%", padding: 10, borderRadius: 8, marginVertical: 10 },
  doarButton: { backgroundColor: "#2B6A80", padding: 12, borderRadius: 8, width: "90%", alignItems: "center", marginTop: 15 },
  doarText: { color: "#fff", fontWeight: "700" },
});
