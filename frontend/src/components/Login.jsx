import { useState } from "react";
import "../index.css";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
const Login = () => {
  let URL;
  let [loading,setLoading] = useState(false)
  let environment = 'production';
  if(environment == 'dev'){
    URL = import.meta.env.VITE_BACKEND_URL;
  }
  else{
    URL = import.meta.env.VITE_URL;
  }
  let Navigate = useNavigate()
  let signupClick = () =>{
         Navigate('/signup');
  }
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('');
  let emailChange = (event) =>{
setEmail(event.target.value)
  }
  let passwordChange = (event) =>{
    setPassword(event.target.value)
  }
  let formSubmit = async (event) =>{
    event.preventDefault();
    setLoading(true)
    console.log(email,password)
 try {
     let data = await axios.post(`${URL}/login`,{
      email,password
    },{withCredentials:true})
    let realdata = await data.data
    console.log(realdata)
   
  Navigate('/')
 } catch (error) {
 
  if(error.response.status === 401){

   return toast.error('Please enter correct password')
  }
  if(error.response.status === 404){
    return toast.error('Please sign up first')
  }
  
 }

  }
  return (
    <div className="newbc min-h-screen flex flex-col justify-center items-center ">
{
  !loading &&       <div>
        
          <div className=" text-5xl mont backdrop:blur-3xl w-full text-[#0C8EE5] ">
            Login to uselai
          </div>
          <div className="border border-cyan-700 rounded-xl w-full mt-8">
            <form onSubmit={formSubmit} className="p-8 flex flex-col items-center justify-center w-full">
            <div className="mt-4 w-full">
                <label htmlFor="email" className="text-white mr-4 font-semibold ">Email</label><br />
              <input type="email" onInput={emailChange} id="email" placeholder="janedoe@gmail.com" className="w-full text-white mt-4 placeholder:text-white/30  focus:border outline-none focus:border-cyan-500 p-2 bg-[#18181A] rounded-sm" />
            </div>
             <div className="mt-4 w-full">
               <label htmlFor="password" className="text-white mr-4  font-semibold">Password</label><br />
              <input type="password" onInput={passwordChange} name="" id="password" placeholder="Enter your password" className="w-full text-white bg-[#18181A] placeholder:text-white/30 outline-none focus:border focus:border-cyan-500 p-2 mt-4 rounded-sm" />
             </div>
             <div className="w-full">
              <button className="bg-cyan-600 mt-6 text-black text-lg p-2 hover:cursor-pointer rounded-lg w-full">Sign in</button>
             </div>
             <div onClick={signupClick} className="text-white/45 mt-8">Don't have an account?<span className="ml-1 text-cyan-400">Sign up</span></div>
            </form>
          
        </div>
      </div>
}
      
      {
        loading && <div className="flex justify-center items-center">
          <LineWave
  height="80"
  width="100"
  radius="9"
  color="cyan"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}        // ✅ Provide a valid object
  wrapperClass=""          // ✅ Provide a valid string
/>
        </div>
      }
</div>
    
  );
};

export default Login;
