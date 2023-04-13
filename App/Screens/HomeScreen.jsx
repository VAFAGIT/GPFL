import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
// import logoNav from "../assets/logo.jpg";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const logoNav = require("../assets/logo.jpg");
  const navigation = useNavigation();

  const getProducts = () => {
    axios.get('http://192.168.1.40:5000/api/product/allproducts')
      .then(response => {
        setProducts(response.data.data);
        // console.log('Products', products);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://192.168.1.40:5000/api/category/allcategories');
      setCategories(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getProducts();
    fetchCategories();
  }, []);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory
  ? products.filter((product) => product.categorie._id === selectedCategory)
  : [];

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productCategory}>{item.categorie.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.productActions}>
        <TouchableOpacity
          style
          ={styles.deleteButton}
          onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
        >
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={logoNav} style={styles.logo} /> */}
        {/* <Text style={styles.title}>Dashboard</Text> */}
      </View>
      <View style={styles.categories}>
        <TouchableOpacity
          style={styles.category}
          onPress={() => handleSelectCategory('')}
        >
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category._id}
            style={styles.category}
            onPress={() => handleSelectCategory(category._id)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.products}>
        <FlatList
          data={filteredProducts}
          renderItem={renderItem} 
          keyExtractor={item => item._id}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 90,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  category: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  products: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  product: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  productActions: {
    flexDirection: 'row',
    
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#A2DCC1',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default HomeScreen;


