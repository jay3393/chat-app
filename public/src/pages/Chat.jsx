import { React, useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Loader from '../assets/loader.gif';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  // Initialize contacts state then load in contacts
  const [contacts, setContacts] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function isLoggedIn() {
      // Check if user accessing the page is logged in
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    isLoggedIn();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      socket.current.emit("send-msg", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchUsers() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchUsers();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      {contacts === undefined ? 
        <Container>
          <img src={Loader} alt="loader" className="loader" />
        </Container> : 
        (
          <Container>
          <div className="container">
            <Contacts 
              contacts={contacts} 
              currentUser={currentUser} 
              chatChange={handleChatChange} 
            />
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
            )
            }
          </div>
        </Container>
        )
      }
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

    .logout-btn {
      background-color: black;
      color: white;
      height: 2rem;
      width: 25%;
      border-radius: 2rem;
      border: 0.1rem solid white;
      cursor: pointer;
      position: absolute;
      bottom: 0%;
      left: 10%;
    }
  }
`;

export default Chat;