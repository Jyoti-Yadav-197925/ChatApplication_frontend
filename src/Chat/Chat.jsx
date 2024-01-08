

import React, { useState, useEffect, useRef } from "react";
// import "./Chat.css";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { allRegisteredUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import {  allUsersRoute, host } from "../utils/APIRoutes";
// import { registeredUsersRoute, host } from "../utils/APIRoutes"; 
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";



export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const[currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("chat-app-user");
      if (!userData) {
        navigate("/login");
        return;
      } else {
        setCurrentUser(await JSON.parse(userData));
        setIsLoaded(true)
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
if(currentUser){
  socket.current = io(host);
  socket.current.emit("add-user", currentUser._id);
}
  },[currentUser])


  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      if (currentUser && currentUser.isAvatarImageSet) {
        try {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`); // Use the new registered users route
          console.log("API Response:", response);
          console.log("API Data:", response.data);
          setContacts(response.data);
        } catch (error) {
          console.log("Error fetching registered users:", error);
          // Handle error
          
        }
      } else {
        navigate("/setAvatar");
      }
    };

    if (currentUser) {
      fetchRegisteredUsers();
    }
  }, [currentUser]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
  <>
      <Container>

    {/* <div className="Container"> */}
      <div className="container">   
      <Contacts
      contacts={contacts}
      currentUser={currentUser}
      changeChat={handleChatChange}

      // setAvatar={setAvatarFunction}
    />


      {
        isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser}/> 
        ):(
          
            <ChatContainer currentChat={currentChat} currentUser = {currentUser} 
            socket={socket}
            />
       
          
           )
      }

</div>
       {/* </div> */}

      </Container>
 
  </>  
  );
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;