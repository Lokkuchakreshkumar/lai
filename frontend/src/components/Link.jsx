import React, { useState, useRef,useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { FaUserTie } from "react-icons/fa6";
import { RiShakeHandsFill } from "react-icons/ri";
import { MdCelebration } from "react-icons/md";
import axios from "axios";
import { LuBrain } from "react-icons/lu";
import { BiSolidZap } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";


const Link = () => {
  
  let URL;
  let environment = 'production';
  if(environment == 'dev'){
    URL = import.meta.env.VITE_BACKEND_URL;
  }
  else{
    URL = import.meta.env.VITE_URL;
  }

  let [data, setData] = useState("");
  let textarearef = useRef(null)
  let newthing = useRef(null);
  let [tech,setTech] = useState([]);
  let [input, setInput] = useState("");
  let [formal, setFormal] = useState(false);
  let [support, setSupport] = useState(false);
  let [happy, setHappy] = useState(false);
  let [thought, setThought] = useState(false);
  let [short, setShort] = useState(false);
  let [long, setLong] = useState(false);
  let [emoji, setEmoji] = useState(false);
  useEffect(()=>{
let textarea = textarearef.current

   if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
  },[input])
let enhanceClick = async() =>{
  if(input == ""){
    toast.error('write post idea',{duration:3000});
    return;
  }
  toast.loading('Enhancing Prompt ',{id:'enhance',duration:Infinity});
  let realPrompt = await axios.post(`${URL}/enhance`,{
    input
  },{withCredentials:true})
  let data = realPrompt.data;
  setInput(data);
  toast.success('Enhanced Prompt',{id:'enhance',duration:3000,removeDelay:3000})
 setTimeout(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 1 + "px";
    }
  }, 0);

}
let research = async (some) =>{
  toast.loading('Reading article ',{id:'reading',duration:Infinity})
  let data = await axios.post(`${URL}/research`,{some})
  let realdata = await data.data
  console.log(realdata)
  toast.success('Read successfully',{id:'reading',duration:3000})
     toast.loading("🧠 Understading", { id: "understand" });
   
    

    try {
     
      let data = await axios.post(`${URL}/scrape`, {
        
        input: {
          input: realdata,
          formal: formal,
          support: support,
          thought: thought,
          happy: happy,
          short:short,
          long:long,
          emoji:emoji
        },
      },{withCredentials:true});
  setTimeout(() => {
      toast.success('6 Agents deployed',{id:'understand'})
      toast.remove('understand')
    },4000 );

   setTimeout(() => {
     toast.loading("✍️ Writing post...", { id: "write", duration: Infinity });
   }, 5500);
      let res = await data.data;
      if (res) {
        toast.success("Post done", { id: "write", duration: 3000,removeDelay:1000 });
      }
      toast.loading("Wrapping", { id: "final", duration: Infinity });

      setData(res);
      toast.success("Done", { id: "final", duration: 3000,removeDelay:1000  });
      toast.remove('final')
      console.log(res);
    } catch (error) {
      console.log(`THIS IS ERROR:${error}`);
      if(error && error.response && error.response.status == 401){
      return  toast.error('limit reached')
      }
    }


}
let handleTech = async() =>{
  toast.loading('Looking into Websites',{id:'tech',duration:Infinity})
  let data = await axios.post(`${URL}/Tech`)
  let res = data.data;
  console.log(res)
  setTech(res)
  toast.success('Done',{id:'tech',duration:3000})
}
  let handleClick = (event) => {
    console.log(event.target);
    if (event.target.id === "formal") {
      setFormal(!formal);
    }
    if (event.target.id === "support") {
      setSupport(!support);
    }
    if (event.target.id === "celeb") {
      setHappy(!happy);
    }
    if (event.target.id === "thought") {
      setThought(!thought);
    }
    if (event.target.id === "short") {
      setShort(!short);
    }
    if (event.target.id === "long") {
      setLong(!long);
    }
     if (event.target.id === "emoji") {
      setEmoji(!emoji);
    }
    
  };
  let onchange = (e) => {
    setInput(e.target.value);
      e.target.style.height = 'auto';
    e.target.style.height =( e.target.scrollHeight+1) + 'px';
    setHeight(e.target.style.height)
  };
  let handleSubmit = async (event) => {
   if(event) event.preventDefault();

    setData("");
    console.log(input);
    if (input == "") {
      toast.error("Write your post");
      return;
    }
   

    try {
      
  
        toast.loading("🧠 Understading", { id: "understand" });
  

  
      let data = await axios.post(`${URL}/scrape`, {
        input: {
          input: input,
          formal: formal,
          support: support,
          thought: thought,
          happy: happy,
          short:short,
          long:long,
          emoji:emoji
        },
      },{withCredentials:true});
    setTimeout(() => {
      toast.success('6 Agents deployed',{id:'understand'})
      toast.remove('understand')
    },4000 );

   setTimeout(() => {
     toast.loading("✍️ Writing post...", { id: "write", duration: Infinity });
   }, 5500);
      let res = await data.data;
      if (res) {
        toast.success("Post done", { id: "write", duration: 3000,removeDelay:1000 });
      }
      toast.loading("Wrapping", { id: "final", duration: Infinity });

      setData(res);
      toast.success("Done", { id: "final", duration: 3000,removeDelay:1000  });
      toast.remove('final')
      console.log(res);
    } catch (error) {
      console.log(error);
        console.log(`THIS IS ERROR:${error}`);
      if(error && error.response && error.response.status == 401){
       return toast.error('limit reached')
      }
    }
  };
  return (
    <div className="w-full flex flex-col mt-12 items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full  flex flex-col items-center justify-center"
      >
    <div className={`relative bg-linear-to-r from-[#014ac8]  to-cyan-500 rounded-xl p-[1.2px]  w-full sm:w-[55%] `}>
       
      <div className="flex items-center flex-wrap space-x-4 space-y-4 p-4 border  rounded-xl bg-black w-full ">
     
           <textarea
          type="text"
          spellCheck={false}
          onChange={onchange}
          ref={textarearef}
          value={input}

          placeholder="Your Post here,If you need specific styles write it down here"
          className=" flex flex-col placeholder:text-white/50   border-none   overflow-y-hidden resize-none text-white text-lg placeholder:text-lg p-8   placeholder:text-center border outline-none    w-full bg-black rounded-lg  "
        />
      

        <div onClick={enhanceClick} className={` w-[59%] border  hover:cursor-pointer bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
 backdrop-blur-3xl sora font-bold hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] rounded-lg sm:w-[13rem]    mb-2 text-black text-center py-3 bg`}><span className="shadow-amber-500"><FaWandMagicSparkles className="text-[#FFD700] drop-shadow-[0_0_8px_#facc15] text-lg inline mr-1"/></span> Enhance Prompt</div>
  <div onClick={handleTech} className={` w-[59%] shadow-inner shadow-slate-800  hover:cursor-pointer bg-[#0F172A]  text-white border border-[#1E293B] 
 backdrop-blur-3xl sora font-bold hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] rounded-lg sm:w-[13rem]    mb-2  text-center py-3 bg`}><span className="shadow-amber-500"><BsGraphUpArrow className="text-cyan-500 drop-shadow-[0_0_8px_cyan] text-lg inline mr-1"/></span> Write from Latest tech</div>
      </div>
        </div>
        <div className="flex items-center justify-center flex-wrap w-[60%] mt-4 gap-4">
          <div>
            <input
              type="checkbox"
              id="formal"
              name="tone"
              onClick={handleClick}
              value="Formal and Clear"
              className="peer hidden "
            />
            <label
              htmlFor="formal"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <FaUserTie className="mr-2 text-xl" />
              Formal and Clear
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="support"
              onClick={handleClick}
              name="tone"
              value="support and Clear"
              className="peer hidden "
            />
            <label
              htmlFor="support"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <RiShakeHandsFill className="mr-2 text-xl" />
              Kind And Supportive
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="celeb"
              name="tone"
              onClick={handleClick}
              value="celebration"
              className="peer hidden"
            />
            <label
              htmlFor="celeb"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <MdCelebration className="mr-2 text-xl" />
              Happy & Grateful
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="thought"
              name="tone"
              onClick={handleClick}
              value="thoughtfull"
              className="peer hidden"
            />
            <label
              htmlFor="thought"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <LuBrain className="mr-2 text-xl" />
              Thoughtful & Honest
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="short"
              name="tone"
              onClick={handleClick}
              value="short"
              className="peer hidden"
            />
            <label
              htmlFor="short"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <BiSolidZap className="mr-2 text-xl" />
              Short
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="long"
              name="tone"
              onClick={handleClick}
              value="short"
              className="peer hidden"
            />
            <label
              htmlFor="long"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <FaRegFileAlt className="mr-2 text-xl" />
              Long
            </label>
          </div>
           <div>
            <input
              type="checkbox"
              id="emoji"
              name="tone"
              onClick={handleClick}
              value="emoji"
              className="peer hidden"
            />
            <label
              htmlFor="emoji"
              className="p-3 border bg-black rounded-xl  text-[#9A9A9A] peer-checked:text-amber-600 outline-none peer-checked:border-amber-600    flex justify-center items-center "
            >
              <BsStars className="mr-2 text-xl" />
              Use More Emojis
            </label>
          </div>
        </div>
        {tech.length!=0 && <div className="w-[90%] h-full mt-8  bg-slate-950/90  border border-[#1E2639] 	 rounded-lg backdrop-blur-2xl p-4 flex  items-center custom-scrollbar  overflow-x-scroll">
          {
            tech.map((el)=>{
              return (
                <div  className="flex flex-col items-center justify-center bg-[#101827]/80 hover:cursor-pointer shadow-[inset_0_0_8px_black]
 hover:shadow-[0_0_12px_black]/30   p-6 min-w-[18rem] sm:min-w-[25rem] h-[12rem]  max-w-[32rem]  mr-4  rounded-xl  " >
                  <div className="w-full text-slate-100 text-lg  " >{el.title}</div>
                  
                  <div onClick={()=>research(el.href)}  className="  text-black font-semibold hover:scale-102 bg-linear-to-r from-cyan-500 to-blue-500/70  shadow-[inset_0_0_8px_black]  border border-cyan-600 p-4 mt-4 rounded-xl  cursor-pointer transition-all duration-200
">Write post on this</div>
                </div>
              )
            })
          }
               </div>}
        <button
          type="submit"
          className="bg-linear-to-r tech  group shadow-[0_0_15px_rgba(255,165,0,0.4)] hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] transition-shadow  from-orange-500 to-yellow-400 font-semibold hover:cursor-pointer text-black p-4 rounded-xl sm:w-[45%] text-xl  my-8"
        >
         Deploy Agents
          
          <span>
            <FaArrowRight className="inline ml-4 group-hover:translate-x-1" />
          </span>
        </button>
        {data && (
          <div className="flex flex-col items-center">
          <div className="flex flex-col items-center bg-black/60 p-6 border border-amber-600 rounded-xl mt-6 w-[95%] sm:w-[65%] text-white text-lg leading-relaxed ">
            <div></div>
            <MdContentCopy
              onClick={() => {
                const realText = newthing.current.innerText;
                navigator.clipboard.writeText(realText);
                toast.success("copied");
              }}
              className="ml-auto mb-8 hover:cursor-pointer"
            />
            <div
              ref={newthing}
              className=""
              dangerouslySetInnerHTML={{ __html: data.final }}
            ></div>
           
          
          </div>
            <div className="flex flex-col items-center bg-black/60 p-6 border border-amber-600 rounded-xl mt-6 w-[95%] sm:w-[65%] text-white text-lg leading-relaxed" dangerouslySetInnerHTML={{__html:data.tags}}></div>
          </div>
        )}
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
        />
      </form>
    </div>
  );
};

export default Link;
