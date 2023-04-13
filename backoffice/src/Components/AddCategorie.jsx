import React, { useState } from 'react';
// import { Formik, F } from 'formik';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';




const AddCategorie = () => {

    const navigate = useNavigate();
    
      const initialValues = {
        name: "",
        description: "",
      };


      
      const CategorieSchema = Yup.object().shape({
        name: Yup.string().required('First Name is required'),
        description: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
      });

  
      const onSubmit = (data) => {
        axios.post("http://localhost:5000/api/category", data).then(() => {
            console.log(data);
            navigate("/office");
        });
    };
  
    return (
      <div className='flex justify-center items-center  '>
          <Formik
      initialValues={initialValues}
          onSubmit={onSubmit}
          CategorieSchema ={CategorieSchema} 
      >
        <div className='justify-center items-center bg-white p-6 rounded-xl mt-10'>
          <h1 className='text-2xl font-bold text-center'>Add Categorie</h1>
         <Form className='flex flex-col gap-6'>

          <label htmlFor="name" className='text-lg font-medium mt-10'>Name:</label>
          <Field 
            className="border-2 px-7 py-2 rounded-lg text-black"
            type="text" 
            name="name" 
            placeholder="name"
          /> 

          <label htmlFor="description" className='text-lg font-medium'>Description:</label>
          <Field 
            className="border-2 px-7 py-2 rounded-lg text-black"
            type="text" 
            name="description" 
            placeholder="Description"
          /> 

          <button 
            type="submit" 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Add
          </button>
          </Form>
        </div>
      </Formik>
     
      </div>
     
    );
  };

export default AddCategorie;