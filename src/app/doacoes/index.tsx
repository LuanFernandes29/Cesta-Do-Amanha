import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Doacoes() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [pixKey] = useState("123.456.789.00");

  const donationAmounts = [10, 25, 50, 100, 200];

  const total =
    selectedAmount !== null ? selectedAmount : customAmount ? parseFloat(customAmount) : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
        
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SUPORTE A NOSSA CAUSA</Text>
        <Text style={styles.headerSubtitle}>
          Ajude essa instituição doando hoje! Todas as doações fazem a diferença.
        </Text>
      </View>

      {/* Opções de valor */}
      <Text style={styles.label}>Quanto você deseja doar?</Text>
      <View style={styles.amountContainer}>
        {donationAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.amountButton,
              selectedAmount === amount && styles.amountButtonSelected,
            ]}
            onPress={() => {
              setSelectedAmount(amount);
              setCustomAmount("");
            }}
          >
            <Text
              style={[
                styles.amountText,
                selectedAmount === amount && styles.amountTextSelected,
              ]}
            >
              R${amount},00
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.amountButton,
            customAmount !== "" && styles.amountButtonSelected,
          ]}
          onPress={() => {
            setSelectedAmount(null);
          }}
        >
          <Text
            style={[
              styles.amountText,
              customAmount !== "" && styles.amountTextSelected,
            ]}
          >
            Quantia personalizada
          </Text>
        </TouchableOpacity>

      </View>

      {/* Valor total */}
      <Text style={styles.label}>Valor total da doação:</Text>
      <TextInput
        style={styles.input}
        placeholder="R$"
        keyboardType="numeric"
        editable={selectedAmount === null}
        value={selectedAmount ? `R$${selectedAmount},00` : customAmount}
        onChangeText={setCustomAmount}
      />

      {/* PIX */}
      <Text style={styles.label}>Forma de pagamento</Text>
      <View style={styles.paymentBox}>
        <Ionicons name="cash-outline" size={22} color="#00BFA6" />
        <Text style={styles.pixText}>Pix</Text>
        <Text style={styles.pixKey}>{pixKey}</Text>
        <Ionicons name="checkmark-circle" size={22} color="#00BFA6" />
      </View>

      {/* Link caixa postal */}
      <TouchableOpacity style={styles.mailButton}>
        <Text style={styles.mailButtonText}>Doar em caixa-postal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingVertical: 20,
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#2B6A80",
    width: "90%",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#E0E0E0",
    textAlign: "center",
    fontSize: 13,
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 10,
  },
  amountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  amountButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 6,
  },
  amountButtonSelected: {
    backgroundColor: "#2B6A80",
  },
  amountText: {
    color: "#333",
  },
  amountTextSelected: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 12,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  pixText: {
    fontWeight: "bold",
    color: "#00BFA6",
  },
  pixKey: {
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  mailButton: {
    marginTop: 20,
  },
  mailButtonText: {
    textDecorationLine: "underline",
    color: "#2B6A80",
<<<<<<< HEAD
  },
=======
  }
>>>>>>> a78da529fadc6f99c52f7ed6701962217f7438b9
});
