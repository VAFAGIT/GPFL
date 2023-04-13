import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/th (1).jpg';


//

  const Register = () => {
    const initialValues = {
      email: "",
      name: "",
      password: "",
  };

  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
      name: Yup.string().required('First Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    });

    const onSubmit = (data) => {
      axios.post("http://localhost:5000/api/admin/register", data).then(() => {
          console.log(data);
          navigate("/", { replace: true });
      });
  };

  return (
    <Formik
    initialValues={initialValues}
      onSubmit={onSubmit}
      RegisterSchema={RegisterSchema} 
   
    >
      <div className='flex justify-between flex-wrap bg-gray-900 text-white'>
          <section className='w-[50%] '>
              <img className='h-[100vh]  w-full object-cover rounded-tr-[5rem] rounded-br-[5rem]' src={bg} alt="" />
          </section>
          <section className='w-[50%] flex flex-col items-center my-auto gap-12 '>
              <div className='text-center'>
              <Link to='/' className='font-bold text-2xl'>Welcome to dashboard</Link>
              <p className='w-[70%] mx-auto text-gray-300 font-light'>this is the door to your dashboard please enter your information</p>
              </div>
          <Form className='flex flex-col gap-6'>
          <div className='flex flex-col'>
                  <label className='' htmlFor="">name</label>
                  <Field className="border-2 px-7 py-2 rounded-lg text-black"
                        type="text" 
                        name="name" 
                        placeholder="name"
                      
                       />             
                        </div>
                        <div className='flex flex-col'>
                        <label className='' htmlFor="">email</label>
                        <Field className="border-2 px-7 py-2 rounded-lg text-black"
                              type="text" 
                              name="email" 
                              placeholder="email"
                              
                            />              
                       </div>
                        <div className='flex flex-col'>
                            <label className='' htmlFor="">password</label>
                            <Field className="border-2 px-7 py-2 rounded-lg text-black" 
                                  type="Password" 
                                  name="password" 
                                  placeholder="password" 
                       
                        />              
                        </div>
              <div className=' self-center '>
                  <button type="submit" className=' text-white w-[19rem] py-2 hover:bg-blue-500 rounded-lg  bg-blue-700'>SignUp</button>

              </div>
          </Form>
          </section>
         
      </div>
      </Formik>
  );
};

export default Register;
