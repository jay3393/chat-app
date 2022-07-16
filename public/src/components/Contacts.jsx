import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo-small.png";

export default function Contacts({contacts, currentUser}) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    // Set current user's name and image
    useEffect(() => {
        console.log(contacts, currentUser);
        if (currentUser) {
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser]);
    // Second arg of useEffect is an array of dependencies that 
    // checks for diff between renders, if there is a difference, 
    // then useEffect will run (having an empty array tells useEffect 
    // to run once after mounted)
    
    const changeCurrentChat = (index, contact) => {

    };

  return (
    <>
        {currentUsername && currentUserImage && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>Zingl</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) => {
                            return (
                                <div 
                                    className={`contact ${
                                        index === currentSelected ? "selected" : ""
                                    }`} 
                                    key={index}
                                >
                                    <div className="avatar">
                                        <img 
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                            alt="avatar" 
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img 
                            src={`data:image/svg+xml;base64,${currentUserImage}`} 
                            alt="avatar" 
                        />
                    </div>
                    <div className="username">
                        <h3>{currentUsername}</h3>
                    </div>
                </div>
            </Container>
        )
        }
    </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        .contact {
            background-color: #ffffff39;
        }
    }
`; 