import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { LineWave } from "react-loader-spinner";
import { IoIosWarning } from "react-icons/io";

const Signup = () => {
  let [loading,setLoading] = useState(false)
  const fpPromise = FingerprintJS.load();
  let getId =  async()=>{
    const fp = await fpPromise;
    const result = await fp.get()
    console.log(result.visitorId)
    return result.visitorId;
  }
  let URL;
  let environment = 'production';
  if(environment == 'dev'){
    URL = import.meta.env.VITE_BACKEND_URL;
  }
  else{
    URL = import.meta.env.VITE_URL;
  }
    let navigate = useNavigate()
  let [userName,setUserName] = useState('')
  let [email,setEmail] = useState('')

  let handleClick = ()=>{
    navigate('/login')
  }
  let [password,setPassword] = useState('');
  let emailChange = (event) =>{
setEmail(event.target.value)
  }
  let passwordChange = (event) =>{
    setPassword(event.target.value)
  }
   let unameChange = (event) =>{
    setUserName(event.target.value)
  }
  let formSubmit = async (event) =>{
    event.preventDefault();
    let visitorId = await getId();
    console.log(email,userName,password,visitorId)
 try {
     let data = await axios.post(`${URL}/signup`,{
      userName,email,password,visitorId
    },{withCredentials:true})
    let realdata = await data.data
    console.log(realdata)
    setLoading(true)
  navigate('/')
 

 } catch (error) {
 console.log(error)
  if(error.response.status == 409){

   return toast.error('User already exist with mail id')
  }
  if(error.response.status == 403){

   return toast.error('Device linked. Use existing account')
  }
 
 }
  }
 return (
    <div className="newbc min-h-screen flex flex-col p-4 justify-center items-center ">
  {
    !loading &&  
     <div>   <div>
        
          <div className=" text-5xl mont backdrop:blur-3xl w-full text-center text-[#0C8EE5] ">
            Sign up to uselai
          </div>
          <div className="border border-cyan-700 rounded-xl w-full mt-8">
            <form onSubmit={formSubmit} className="p-8 flex flex-col items-center justify-center w-full">
              <div className="mt-4 w-full">
                <label htmlFor="uname" className="text-white mr-4 font-semibold ">Username</label><br />
              <input type="text" onInput={unameChange} id="uname" placeholder="Username" className="w-full text-white mt-4 placeholder:text-white/30  focus:border outline-none focus:border-cyan-500 p-2 bg-[#18181A] rounded-sm" />
            </div>
            <div className="mt-4 w-full">
                <label htmlFor="email" className="text-white mr-4 font-semibold ">Email</label><br />
              <input type="email" onInput={emailChange} id="email" placeholder="janedoe@gmail.com" className="w-full text-white mt-4 placeholder:text-white/30  focus:border outline-none focus:border-cyan-500 p-2 bg-[#18181A] rounded-sm" />
            </div>
             <div className="mt-4 w-full">
               <label htmlFor="password" className="text-white mr-4  font-semibold">Password</label><br />
              <input type="password" onInput={passwordChange} name="" id="password" placeholder="Enter your password" className="w-full text-white bg-[#18181A] placeholder:text-white/30 outline-none focus:border focus:border-cyan-500 p-2 mt-4 rounded-sm" />
             </div>
             <div className="w-full">
              <button className="bg-cyan-600 mt-6 text-black text-lg p-2 hover:cursor-pointer rounded-lg w-full">Sign up</button>
             </div>
             <div  className="text-white/45 mt-8">Already have an account?<span onClick={handleClick} className="ml-1 text-cyan-400">Sign in</span></div>
            </form>
          
        </div>
       <div className='flex items-center p-2 rounded-lg  border mt-8 border-yellow-300'>
         <div className='text-white/80 '><IoIosWarning className='inline text-yellow-400 m-2'/>we use one device one login policy,so be carefull while entering your details</div>
       </div>
      </div>
        <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  className: "text-lg",
                  duration: 3000,
      
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
      
                  success: {
                    duration: 3000,
                    removeDelay: 1000,
                    iconTheme: {
                      primary: "green",
                      secondary: "black",
                    },
                  },
                }}
              /></div>
  }
  {
    loading &&  <div className="flex justify-center items-center">
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
}

export default Signup