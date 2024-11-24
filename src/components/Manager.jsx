import React, { useState, useRef, useEffect } from 'react'
import openEye from '../../public/icons/openEye.svg'
import closeEye from '../../public/icons/closeEye.svg'
import copyIcon from '../../public/icons/copy.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editIcon from "../../public/icons/edit.svg"
import deleteIcon from "../../public/icons/delete.svg"
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const [form, setForm] = useState({ site: "", user: "", password: "" })
    const ref = useRef()
    const passwordRef = useRef()
    // Show or Hide Password
    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes(closeEye)) {
            ref.current.src = openEye
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = closeEye
            passwordRef.current.type = "text"
        }
    }



    // Saving password in LocalStorage
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("password")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    // const savePassword = () => {
    //     console.log(form);
    //     setPasswordArray([...passwordArray, form])
    //     localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    //     console.log([...passwordArray, form]); 
    // }

    const savePassword = () => {
        if (form.user == "" || form.password == "" || form.site == "") {
            // const missingField = form.user == "" ? "username" : "password"
            let missingField;
            if (form.site == "") {
                missingField = "url"
            }
            else if (form.user == "") {
                missingField = "username"
            }
            else {
                missingField = "password"
            }
            toast.info(`Fill up the ${missingField}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } else {
            // console.log(form);
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, {...form, id: uuidv4()}]);
        }
    }


    // Edit Password Function
    const editPassword = (id)=>{
        console.log('Editing the info of id: ', id);
        setForm(passwordArray.filter(item=>item.id === id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id !== id))
    }



    // Delete Password Function
    const deletePassword = (id)=>{
        let result = confirm("Do you want to delete this ? ")
        if(result === true){
            console.log('Deleting the info of id: ', id);
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            // alert("Delete successfully")
        }
    }



    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    // Copying text function:
    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            {/* <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}
            <div className="myContainer min-h-[88vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg my-2 font-bold text-center'>Your own Password Manager</p>

                {/* Input Field */}
                <div className="text-black flex flex-col  p-4 items-center">

                    {/* URL */}
                    <input value={form.site} name='site' onChange={handleChange} type="text" className='rounded-md p-2 my-3 border border-black text-lg w-full' placeholder='Enter the Url' />

                    {/* Username */}
                    <div className="flex flex-col  md:flex-row gap-6 justify-center">
                        <input value={form.user} name='user' onChange={handleChange} className='py-2 px-3 rounded-md border   border-black w-10/\12' type="text" placeholder='Username' />

                        {/* Password */}
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} name='password' onChange={handleChange} className='py-2 px-3 rounded-md border   border-black w-10/\12' type="password" placeholder='Password' />
                            <span className='absolute py-3 px-2 right-[10px] top-[-3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='' src={openEye} alt="eye" />
                            </span>
                        </div>

                    </div>


                    <button className='flex gap-2 justify-center items-center bg-green-500 my-4 rounded-full px-6 py-3 w-fit hover:bg-green-400 border-2 border-green-900' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save</button>

                </div>

                <h2 className='py-4 font-bold text-2xl'>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to show</div>}
                {passwordArray.length != 0 &&
                    <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site URL</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>

                                    {/* URL section */}

                                    <td className='text-center py-2 border-b-4 border-white cursor-pointer hover:text-blue-500 hover:underline '>
                                        <div className=' flex justify-center items-center'>
                                            <a href={item.site} target='_blank'><span>{item.site}</span></a>
                                            <div className='flex justify-end' onClick={() => { copyText(item.site) }}>
                                                <img src={copyIcon} className='w-9 px-2 ml-2 cursor-pointer hover:scale-125' alt="" />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Username */}

                                    <td className=' text-center  py-2 border-b-4 border-white '>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.user}</span>
                                            <div className='flex justify-end' onClick={() => { copyText(item.user) }}>
                                                <img src={copyIcon} className=' w-9 px-2 ml-2 cursor-pointer hover:scale-125' alt="" />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Password */}

                                    <td className='text-center  py-2 border-b-4 border-white '>
                                        <div className='flex justify-center items-center '>
                                            <span>{item.password}</span>
                                            <div className='flex justify-end' onClick={() => { copyText(item.password) }} >
                                                <img src={copyIcon} className='w-9 px-2 ml-2 cursor-pointer hover:scale-125' alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center  py-2 border-b-4 border-white '>
                                        <div className='flex justify-center items-center gap-2'>
                                            {/* Edit Option */}
                                        <span className='cursor-pointer hover:bg-slate-200 rounded-md py-2 px-2 hover:ring-black hover:ring-1' onClick={()=>{editPassword(item.id)}}>
                                            <img src={editIcon} alt="edit" className='w-6' />
                                        </span>

                                            {/* Delete Option */}
                                        <span className='cursor-pointer hover:bg-slate-200 rounded-md py-2 px-2 hover:ring-black hover:ring-1' onClick={()=>{deletePassword(item.id)}}>
                                            <img src={deleteIcon} alt="" className='w-6' />
                                        </span>
                                        </div>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>


                }
            </div>

        </>
    )

}

export default Manager
