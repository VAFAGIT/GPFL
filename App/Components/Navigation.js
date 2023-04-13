import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Pressable, 
  View, 
  Image,
  Text, 
  TextInput, 
  TouchableOpacity,  
  StyleSheet, 
  Button
} from "react-native";
import HomeScreen from '../Screens/HomeScreen';
import AuthScreen from '../Screens/AuthScreen';
import SignupScreen from '../Screens/SignupScreen';
// import WelcomeScreen from '../Screens/WelcomeScreen';
import ProductDetailScreen from '../Screens/ProductDetailScreen';
import SplashScreen from '../Screens/SplashScreen';
import { AuthContext } from '../context/AuthContext';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();





const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator 
         screenOptions={{
          headerStyle: {
            backgroundColor: '#e6ffe6',
          },
         }}
      >
      
          
      <Stack.Screen 
            name="/"
            component={AuthScreen}
            options={{
              title: 'login'
            }}
          />

          <Stack.Screen 
            name="Register"
            component={SignupScreen}
          />

          <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Welcomme'
            }}
          />
          
          <Stack.Screen 
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              title: 'ProductDetail'
            }}
          />

          


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
