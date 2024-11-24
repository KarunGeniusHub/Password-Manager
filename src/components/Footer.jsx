import React from 'react'
import Love from "../../public/icons/love.svg"
const Footer = () => {
    return (
        <div className='bg-slate-800 text-white box-border fixed bottom-0 w-full'>
            <div className="logo font-bold text-2xl text-white flex justify-center items-center">
                <span className='text-green-700'> &lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center flex-row gap-1'>
                    Create with <img className='w-7' src={Love} alt="" /> by GOK'S
            </div>
        </div>
    )
}

export default Footer
