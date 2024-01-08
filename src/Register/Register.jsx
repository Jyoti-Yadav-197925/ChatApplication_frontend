import React, { useState,useEffect } from 'react';
import axios from 'axios';
import{Link, useNavigate} from "react-router-dom";
// import "./Register.css";
import styled from "styled-components";
import Logo from "../assets/whatsapp.svg"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
   const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    

    const handleSubmit = async(event) =>{
        event.preventDefault();
        // alert("form");
        if(handleValidation()){
           console.log("in validation", registerRoute);
            const { password, confirmPassword, username, email } = values;
            const {data} = await axios.post(registerRoute,{
                username,email,password,
            });
            if(data.status === false){
                toast.error(data.msg, selectOptionToast);
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                console.log("Registered user:", data.user);
              }
            navigate("/");
        };

    };

    const selectOptionToast = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
        }
      },[]);

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            // alert("something..");
            console.log("is it validating?..", selectOptionToast);
          toast.error(
            "Passwords should match with each other.",
            selectOptionToast
          );
          return false;
        } else if (username.length < 5) {
          toast.error(
            "Username should be atleast more than 5 characters.",
            selectOptionToast
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be greater than or equal to 8 characters.",
            selectOptionToast
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", selectOptionToast);
          return false;
        }
    
        return true;
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
      };
      
    
    return(
        <>
        <FormContainer>
            {/* <div className="FormContainer"> */}
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>gix</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
        {/* </div> */}
      </FormContainer>
      <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;