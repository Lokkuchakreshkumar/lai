import React, { useState, useRef } from "react";
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


const Link = () => {
  const URL = import.meta.env.VITE_URL;
  let [data, setData] = useState("");
  let newthing = useRef(null);
  let [input, setInput] = useState("");
  let [formal, setFormal] = useState(false);
  let [support, setSupport] = useState(false);
  let [happy, setHappy] = useState(false);
  let [thought, setThought] = useState(false);
  let [short, setShort] = useState(false);
  let [long, setLong] = useState(false);
  let [emoji, setEmoji] = useState(false);

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
  let onchange = (event) => {
    setInput(event.target.value);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();

    setData("");
    console.log(input);
    if (input == "") {
      toast.error("Write your post");
      return;
    }
      toast.loading("🧠 Understading", { id: "understand" });
    setTimeout(() => {
      toast.success('6 Agents deployed',{id:'understand'})
      toast.remove('understand')
    },4000 );
  
   setTimeout(() => {
     toast.loading("✍️ Writing post...", { id: "write", duration: Infinity });
   }, 5500);

    try {
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
      });

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
    }
  };
  return (
    <div className="w-full flex flex-col mt-12 items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full  flex flex-col items-center justify-center"
      >
    <div className=" relative bg-linear-to-r from-[#014ac8] to-cyan-500 rounded-lg p-[1.2px] flex items-center justify center w-full sm:w-[55%] ">
        <textarea
          type="text"
          spellCheck={false}
          onChange={onchange}
          value={input}
          onInput={(e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }}
          placeholder="Your Post here,If you need specific styles write it down here"
          className=" flex placeholder:text-white/50   overflow-y-hidden resize-none text-white text-lg placeholder:text-lg px-4   placeholder:text-center border outline-none    w-full bg-black rounded-lg py-4 "
        />
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
        <button
          type="submit"
          className="bg-linear-to-r tech  group shadow-[0_0_15px_rgba(255,165,0,0.4)] hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] transition-shadow  from-orange-500 to-yellow-400 font-semibold hover:cursor-pointer text-black p-4 rounded-xl sm:w-[45%] text-xl  my-8"
        >
          Connect With AI{" "}
          
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
