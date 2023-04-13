import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoNav from "../assets/logo.jpg";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getProducts = () => {
    axios.get('http://localhost:5000/api/product/allproducts')
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
      const response = await axios.get('http://localhost:5000/api/category/allcategories');
      setCategories(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
    fetchCategories();
  });

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${productId}`);
      toast.success('Product deleted successfully');
      getProducts();
    } catch (error) {
      console.error(error);
    }

  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory
  ? products.filter((product) => product.categorie._id === selectedCategory)
  : [];

    return (
        <div className='bg-white'>
           <Link to="/office">
              <img src={logoNav} alt="merkob.ma" className="w-[150px]" />
            </Link>
          {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}
          <div className='flex justify-between mt-8 mx-5'>
          <div className="flex justify-between items-center mb-4">
          <Link
              to="/office/order"
              className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-400 transition duration-300 ml-5"
            >
              Orders
            </Link>
            <Link
              to="/office/addproduct"
              className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-400 transition duration-300 ml-5"
            >
              Add Product
            </Link>
            <Link
              to="/office/addcategorie"
              className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-400 transition duration-300 ml-5"
            >
              Add Category
            </Link>
            
          </div>
          <div className="justify-end mb-4">
            <select
              className="border border-gray-300 py-2 px-4 rounded-md mr-4"
              value={selectedCategory}
              onChange={(e) => handleSelectCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {Array.isArray(categories) && categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              
              ))}
                
                
                
        </select>
          </div>
          </div>
         
          <div className="bg-white shadow-md rounded-md mt-5">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700 font-medium text-sm">

                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    
                    <td className="border px-4 py-2">{product.productName}</td>
                    <td className="border px-4 py-2">{product.categorie.name}</td>
                    <td className="border px-4 py-2">${product.price}</td>
                    <td className="border px-4 py-2">
                      <Link
                        to={`/office/updateproduct/${product._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-500 transition duration-300 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-500 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

};

export default Dashboard;