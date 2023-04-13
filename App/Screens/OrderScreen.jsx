import React, { useState, useEffect, useContext } from "react";
import Spinner from "react-native-loading-spinner-overlay";


import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable 
} from 'react-native';

const OrderScreen = ({navigation}) => {

    const [product, setProduct] = useState("");
    const [user, setUser] = useState("");
    const [adress, setAdress] = useState("");
    const [num_carte_bancaire, setNum_carte_bancaire] = useState("");
    const [quantité, setQuantité] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const imgj = require('../assets/logo.jpg');

    const createOrder = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user,
                    product: product,
                    adresse: adress,
                    num_carte_bancaire: num_carte_bancaire,
                    quantité: quantité,
                }),
            });
            const json = await response.json();
            setIsLoading(false);
            if (json.success) {
                navigation.navigate("OrderList");
            } else {
                setErrorMsg(json.message);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setErrorMsg("Error occurred. Please try again.");
        }
    };

    return  (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <Image source={imgj} style={{ width: 200, height: 100, marginBottom: 40 }} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={user}
                    placeholder="User ID"
                    onChangeText={(text) => setUser(text)}
                />
                <TextInput
                    style={styles.input}
                    value={product}
                    placeholder="Product ID"
                    onChangeText={(text) => setProduct(text)}
                />
                <TextInput
                    style={styles.input}
                    value={adress}
                    placeholder="Address"
                    onChangeText={(text) => setAdress(text)}
                />
                <TextInput
                    style={styles.input}
                    value={num_carte_bancaire}
                    placeholder="Credit Card Number"
                    onChangeText={(text) => setNum_carte_bancaire(text)}
                />
                <TextInput
                    style={styles.input}
                    value={quantité}
                    placeholder="Quantity"
                    onChangeText={(text) => setQuantité(text)}
                />

                <Pressable
                    style={styles.Button}
                    onPress={() => {
                        createOrder();
                    }}
                >
                    <Text style={{ color: "white", textAlign: "center" }}>Create Order</Text>
                </Pressable>

                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
                    
                </View>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 100,
        paddingHorizontal:
            20,     
    },
    Button: {
        backgroundColor: "#f01d71",
        padding: 10,
        borderRadius: 100,
        marginTop: 20,
    },
});
