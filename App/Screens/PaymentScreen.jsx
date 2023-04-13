import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PaymentScreen = ({ route }) => {
  const { amount } = route.params;
  const [paymentID, setPaymentID] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axios.post('https://mon-api-rest.com/paypal', {
        amount: amount,
      });
      setPaymentID(response.data.paymentID);
      const { redirect_url } = response.data.links.find((link) => link.rel === 'approval_url');
      // Rediriger l'utilisateur vers la page de paiement PayPal
      window.location.href = redirect_url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total : {amount} €</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Payer avec PayPal</Text>
      </TouchableOpacity>
      {paymentID && <Text style={styles.paymentID}>Payment ID : {paymentID}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentID: {
    marginTop: 20,
  },
});

export default PaymentScreen;
