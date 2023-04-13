import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import Register from './pages/Register';
import AddCategorie from './Components/AddCategorie';
import Add from './Components/ADDPCT';
import UpdateP from './Components/ProductUpdateForm';
import Order from './pages/Order';


function App() {
  const token=localStorage.getItem('token')
  return (
    <div className="min-h-screen bg-gray-100">
    <BrowserRouter>
         
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/office" element={token ? <Dashboard /> : <Login />} />
               
                <Route path="/office/addcategorie" element={<AddCategorie />} />
                <Route path="/office/addproduct" element={<Add />} />
                <Route path="/office/updateproduct" element={<UpdateP />} />
                <Route path="/office/order" element={<Order />} />
                
                
              </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
