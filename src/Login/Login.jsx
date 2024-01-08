


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/whatsapp.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';
import AuthenticatedRoute from './AuthenticatedRoute';
import Chat from '../Chat/Chat';

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('chat-app-user');
    if (user) {
      setIsLoggedIn(true);
      navigate('/'); // Redirect to the main page or dashboard if the user is already logged in
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });

      if (data.status === false) {
        toast.error(data.msg, {
          position: 'bottom-right',
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        setIsLoggedIn(true);
        navigate('/'); // Redirect to the main page after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  if (isLoggedIn) {
    return <AuthenticatedRoute path="/" element={<Chat />} />;
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={handleLogin}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>gix</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            min="5"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login In</button>
          <span>
            If Don't have an account ? <Link to="/register">Register.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
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