import { React, useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Loader from '../assets/loader.gif';

function Chat() {
  const navigate = useNavigate();
  // Initialize contacts state then load in contacts
  const [contacts, setContacts] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function isLoggedIn() {
      // Check if user accessing the page is logged in
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    isLoggedIn();
  }, []);

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

  const logout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
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
            <Contacts contacts={contacts} currentUser={currentUser} />
            <button 
              value="Logout"
              onClick={logout}
            >
              Logout
            </button>
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
  }
`;

export default Chat;