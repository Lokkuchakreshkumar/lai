
import Link from "./components/Link"
const App = () => {
  return (
   
    <div className='bc   min-h-screen p-6  text-black'>
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