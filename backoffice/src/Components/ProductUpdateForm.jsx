import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/allcategories');
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/product/update/${id}`, product);
      navigate(`/office`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
  <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold mb-4">Edit Product</h1>

    <div className="flex flex-col mb-4">
      <label htmlFor="productName" className="mb-2 text-lg font-medium">Product Name:</label>
      <input
        className="border-2 px-3 py-2 rounded-lg text-black"
        type="text"
        name="productName"
        value={product.productName || ''}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="description" className="mb-2 text-lg font-medium">Description:</label>
      <input
        className="border-2 px-3 py-2 rounded-lg text-black"
        type="text"
        name="description"
        value={product.description || ''}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="price" className="mb-2 text-lg font-medium">Price:</label>
      <input
        className="border-2 px-3 py-2 rounded-lg text-black"
        type="text"
        name="price"
        value={product.price || ''}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="category" className="mb-2 text-lg font-medium">Category:</label>
      <select
        name="category"
        id="category"
        value={product.category || ''}
        onChange={handleInputChange}
        className="border-2 px-3 py-2 rounded-lg text-black"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="image" className="mb-2 text-lg font-medium">Image:</label>
      <input
        className="border-2 px-3 py-2 rounded-lg text-black"
        type="text"
        name="image"
        value={product.image || ''}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex flex-col mb-4">
      <label htmlFor="quantity" className="mb-2 text-lg font-medium">Quantity:</label>
      <input
        className="border-2 px-3 py-2 rounded-lg text-black"
        type="text"
        name="quantity"
        value={product.quantity || ''}
        onChange={handleInputChange}
      />
    </div>

    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">Save Changes</button>
  </div>
</form>

    </div>
  );
};

export default EditProduct;
