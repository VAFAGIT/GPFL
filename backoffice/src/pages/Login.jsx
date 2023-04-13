import React, { useState  } from 'react';
import { useNavigate,  Link} from 'react-router-dom';
import bg from '../assets/th (1).jpg';
import axios from 'axios';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post('http://localhost:5000/api/admin/', {
        email,
        password,
      });

      console.log(response.data);
      localStorage.setItem('token', response.data.data);
     window.location.href='office'
      
    } catch (error) {
      
      console.error(error);
    }
  };





  return (
    <div className="flex justify-between flex-wrap bg-gray-900 text-white">
       <section className="w-[50%] ">
            <img className="h-[100vh]  w-full object-cover rounded-tr-[5rem] rounded-br-[5rem]" src={bg} alt=""/>
        </section>
        <section className="w-[50%] flex flex-col items-center my-auto gap-12 ">
            <div className="text-center">
            <Link to="/" className="font-bold text-2xl">Welcome back</Link>
            <p className="w-[70%] mx-auto text-gray-300 font-light">this is the door to your dashboard please enter your information</p>
            </div>
        <form className='flex flex-col gap-6'>
            <div className='flex flex-col'>
                <label className='' htmlFor="">email</label>
                <input className='border-2 px-7 py-2 rounded-lg text-black' 
                       type="email" placeholder='email...'  
                        onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                />
            </div>
            <div className='flex flex-col'>
                <label className='' htmlFor="">password</label>
                <input className='border-2 px-7 py-2 rounded-lg text-black'
                       type="password" 
                       placeholder='password...' 
                       onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                />
            </div>
            <div className=' self-center '>
                <button className='bg-blue-700 text-white w-[19rem] py-2 hover:bg-blue-400 rounded-lg'  onClick={handleSubmit} >SignIn</button>
                <div>
                    <p className='text-gray-400'>Don't have account? <Link to='/register' className='text-blue-700 hover:text-blue-800 font-semibold'>Sign up</Link> </p>
                </div>
            </div>
        </form>
        </section>
    </div>

  );
}






export default Login;
