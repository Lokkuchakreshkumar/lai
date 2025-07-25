import { useEffect,useState} from "react"
import Link from "./components/Link"
import { useNavigate } from "react-router-dom"

import axios from "axios"


const App = () => {
  let URL;
  let environment = 'production';
  if(environment == 'dev'){
    URL = import.meta.env.VITE_BACKEND_URL;
  }
  else{
    URL = import.meta.env.VITE_URL;
  }
  let [credit,setCredit] = useState(0)
    useEffect(()=>{
let newfetch = async()=>{
try {
   let data = await axios.get(`${URL}/user`,{withCredentials:true})
 let realdata = await data.data;
console.log(realdata)
setCredit(realdata.credits)
 
} catch (error) {
  console.log(error)
  if(error.response.status == 404){
    Navigate('/login')
    setDone(true)
  }
   
}
 }
 newfetch();
},[])
  let logout = async() =>{
   try {
     let data = axios.post(`${URL}/logout`,{},{withCredentials:true})
    let realdata = await data.data;
    console.log(realdata)
    Navigate('/login')
   } catch (error) {
    console.log(error)
   }
  }
let Navigate = useNavigate()
  let [done,setDone] = useState(false)
  let handleClick = () =>{
  Navigate('/login')
  }
  let handleSignup = () =>{
    Navigate('/signup')
  }

  return (
  
    <div className='bc   min-h-screen p-6  text-black'>
     <div className="flex space-x-4">
     {
      done &&  <div> <div onClick={handleClick} className="text-white">Login</div>
      <div onClick={handleSignup} className="text-white">Sign up</div></div>
     }
    <div className="flex items-center space-x-8 ml-auto"> {credit && <div className="ml-auto p-3 bg-[#15231D]  text-green-600 rounded-sm">${credit} left</div>}
     {
      !done && <div  onClick={logout} className=" px-4 py-2 hover:bg-black hover:cursor-pointer hover:scale-101 transition duration-400 border rounded text-white">Log out</div>
     }</div>
     </div>
       <div className=" flex flex-col  items-center justify-center">
     <div className=" tech font-semibold  bg-linear-to-r from-white p-4 to-[#545252] text-transparent text-4xl sm:text-6xl mt-4 bg-clip-text">Everything App</div>
          <div className=" tech font-semibold  bg-linear-to-r from-white  pb-4 to-[#545252] text-transparent text-4xl sm:text-6xl bg-clip-text">For your Posts</div>
          <div className="text-white/40 text-center text-sm">AI helps you tag right people and write better, so your posts get noticed.</div>
   <Link/>
   </div>
    </div>
    
  )
}

export default App