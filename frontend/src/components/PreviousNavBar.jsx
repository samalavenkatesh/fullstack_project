import React, { createContext, useContext, useEffect, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { TbBellRinging } from "react-icons/tb";

import { Link,NavLink, useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthContext';

// import pic from '../assets/green.webp';

// import { Link } from 'react-scroll';

function NavBar() {
    const { loggedIn, loggedInUser, logout ,type } = useContext(AuthContext);
    console.log(type);
    // const AuthContext = createContext();
    // const navigate = useNavigate();

    // const [loggedIn,setLoggedIn] = useState(false);
    // const [loggedInUser,setLoggedInUser] = useState(null);

    // useEffect(() => {
    //     const user = localStorage.getItem("loggedInUser");
    //     if (user) {
    //         setLoggedIn(true);
    //         setLoggedInUser(user);
    //     }
    // }, []);
    
    
    // const handleLogout = (e) => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("loggedInUser");
    //     setLoggedIn(false);
    //     setTimeout(()=>{
    //         navigate('/login');
    //     },1000);
    // }

    

    const [menu,setMenu]=useState(false);
        const navItems=[
            {
                id:0,
                text:"Home",
                url:"/"
            },
            {
                id:1,
                text:"Shop",
                url:"/Buyer"
            },
            {
                id:2,
                text:"Sell",
                url:"/Farmer"
            },
            {
                id:3,
                text:"Contacts",
                url:"/Contacts"
            },
        ]
        
    return (
        <>
        <div className='max-w-screen-2xl h-16 container md:px-12 shadow-md fixed left-0 top-0 right-0 z-50 bg-white'>
            <div className='flex justify-between items-center h-16'>
                <div className='flex gap-8 md:gap-0 p-10 md:p-0 space-x-8 md:space-x-6  justify-center items-center  '>
                    {/* <img src={pic} className='w-18 h-14 rounded-full' alt="" /> */}
                    <h1 className='font-bold text-xl'>
                    FARM<span className='text-green-500 text-2xl'>MART</span>
                    <p className='text-sm'>By Farmer Hands</p>
                    </h1>
                </div>

                {/* desktop nav bar */}

                <div className='text-gray-700' >
                    <ul className='hidden md:flex space-x-10 text-xl gap-6 '>
                        {navItems.map(({id,text,url})=>(
                            <li className='font-bold hover:text-black duration-150 cursor-pointer' key={id}>
                                <NavLink to={url} className={({isActive}) => isActive ? "active-link": ""} > 
                                    {text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    
                    <div onClick={()=>setMenu(!menu)} className='md:hidden mr-5'>
                        {menu? <IoCloseSharp size={24} /> :<AiOutlineMenu size={24}/>  }
                    </div>
                </div>

                <div>
                    {loggedIn ? (
                        <div className='hidden md:flex items-center space-x-4 font-bold'>
                            <span className='mx-10 font-bold'>{loggedInUser}</span>
                            <button onClick={logout} className='p-2 px-4 bg-green-500 text-white cursor-pointer rounded-md'>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className='hidden md:flex items-center space-x-4 font-bold'>
                            <Link to="/Register" className='p-2 px-4 border text-green-500 border-green-500 cursor-pointer rounded-md'>
                                Join
                            </Link>
                            <Link to="/Login" className='p-2 px-4 bg-green-500 text-white cursor-pointer rounded-md'>
                                Login
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            {/* mobile nav bar */}

            {
                menu && (

                <div className='h-screen max-w-screen bg-white '>
                
                    <ul className='md:hidden flex flex-col  space-y-3 text-xl items-center'>
                        <div className='flex py-8 gap-x-4 font-bold'>
                            <span className='p-2 px-4 border text-green-500 border-green-500'>
                                <Link to="/Register" onClick={()=> setMenu(false)}>Join</Link>
                            </span>
                            <span className='p-2 px-4 bg-green-500 text-white'>
                                <Link to="/Login"  onClick={()=> setMenu(false)}>Login</Link>
                            </span>
                        </div>
                        {navItems.map(({id,text,url})=>(
                            <li className='font-semibold' key={id}>
                                <Link to={url} onClick={()=> setMenu(false)} >
                                    {text}
                                </Link>
                                
                            </li>
                        ))}
                    </ul>

                </div>
                )
            }


        </div>
        </>  
    )

}

export default NavBar
