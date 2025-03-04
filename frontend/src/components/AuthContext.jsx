import React, { createContext, useState, useEffect } from 'react';
import { handleSuccess } from '../utils';
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // const navigate =useNavigate(); 
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([]);
    // const [type, setType] = useState("Retailer");
    const [type, setType] = useState(null);
    const [menu, setMenu] = useState(false);
    const [loggedout,setLoggedOut] =useState(false);
    // console.log(loggedInUser);
    
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedIn(true); 
            setLoggedInUser(user);
            const usertype = localStorage.getItem("type");
            setType(usertype);
        }
    }, []);
    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setLoggedIn(false);
        setLoggedInUser(null);
        setMenu(false);
        setLoggedOut(true);
        handleSuccess("Logged Out");
        window.location.href = "/"; // Redirect to the landing page immediately
    };
    // useEffect(()=>{
    //     // location.reload()
    //     if(loggedout){
    //         handleSuccess("Logged Out");
    //     }
    // },[loggedout]);

    return (
        <AuthContext.Provider value={{ loggedIn, loggedInUser, setLoggedIn, setLoggedInUser, logout ,type ,setType,menu, setMenu }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
