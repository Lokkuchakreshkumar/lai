import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'


const router = createBrowserRouter([
  {path:'/',element:<App/>},
  {path:'/login',element:<Login/>},
  {path:'/signup',element:<Signup/>}
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode> 
   <RouterProvider router={router}/>
  </StrictMode>,
)
