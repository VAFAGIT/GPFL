import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const addProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/allcategories');
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/product', {
        productName,
        description,
        price,
        category,
        image,
        quantity,
      });
      console.log(response.data);
      navigate('/office');
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" flex justify-center items-center ">
         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
  <div className="bg-white rounded-lg shadow-lg px-10 py-8">

    <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>

    <div className="mb-4">
      <label htmlFor="productName" className="block font-medium text-gray-700 mb-2">Product Name:</label>
      <input
        className="border-2 px-4 py-2 rounded-lg w-full text-black"
        type="text" 
        name="productName" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
      /> 
    </div>

    <div className="mb-4">
      <label htmlFor="description" className="block font-medium text-gray-700 mb-2">Description:</label>
      <input
        className="border-2 px-4 py-2 rounded-lg w-full text-black"
        type="text" 
        name="description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
      /> 
    </div>

    <div className="mb-4">
      <label htmlFor="price" className="block font-medium text-gray-700 mb-2">Price:</label>
      <input
        className="border-2 px-4 py-2 rounded-lg w-full text-black"
        type="text" 
        name="price" 
        value={price} 
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
      /> 
    </div>

    <div className="mb-4">
      <label htmlFor="category" className="block font-medium text-gray-700 mb-2">Category:</label>
      <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="border-2 px-4 py-2 rounded-lg w-full text-black">
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="image" className="block font-medium text-gray-700 mb-2">Image:</label>
      <input 
        className="border-2 px-4 py-2 rounded-lg w-full text-black"
        type="text" 
        name="image" 
        value={image} 
        placeholder="URL"
        onChange={(e) => setImage(e.target.value)}
      /> 
    </div>

    <div className="mb-4">
      <label htmlFor="quantity" className="block font-medium text-gray-700 mb-2">Quantity:</label>
      <input 
        className="border-2 px-4 py-2 rounded-lg w-full text-black"
        type="text" 
        name="quantity" 
        value={quantity} 
        placeholder="quantity"
        onChange={(e) => setQuantity(e.target.value)}
      /> 
    </div>

    <div className="flex justify-center mt-6">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">Add</button>
    </div>

  </div>
</form>

    </div>
  );
};

export default addProduct;
