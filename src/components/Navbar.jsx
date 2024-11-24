import React, { useEffect, useState } from 'react'
import Git from "../../public/icons/githublogo.svg"
const Navbar = () => {

    const [sticky, setSticky] = useState(false)
    useEffect(() => {
      const handleScrool = ()=>{
        if(window.scrollY >0){
            setSticky(true)
        }else{
            setSticky(false)
        }
      }
      window.addEventListener("scroll", handleScrool)
      return ()=>{
      window.removeEventListener("scroll", handleScrool)
      }
    }, [])
    
    return (
        <nav className={`bg-slate-800 text-white fixed top-0 left-0 right-0 z-50 ${sticky ? "sticky-navbar bg-slate-700 shadow-md duration-300 transition-all ease-in-out" : ""}`} >
            <div className='myContainer flex justify-between items-center py-5 h-14  '>
                <div className="logo font-bold text-2xl text-white ">
                    <span className='text-green-700'> &lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-10 '>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="">About</a>
                        <a className='hover:font-bold' href="">Contact</a>
                    </li>
                </ul> */}
            <button className='bg-green-400 py-2 rounded-md px-3 flex gap-4 text-white hover:scale-95 ring-white ring-1'>
                <img className='w-7 invert-0' src={Git} alt="hhh" />
                <span className='justify-center font-bold pt-[3px]'>GitHub</span>
            </button>
                    
            </div>
        </nav>
    )
}

export default Navbar
