import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import axios from "axios";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/Binx Bond.svg`;

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const selectOptionToast = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));

    if (!storedUser || !storedUser._id) {
      console.error("User or user._id is null or undefined");
      toast.error("Error: User data not found", selectOptionToast);
      return;
    }

    if (selectedAvatar === undefined || selectedAvatar ===null) {
      toast.error("Please select an Avatar", selectOptionToast);
      console.log("No avatar selected!");
    } else {
      const user = { ...storedUser }; // Renamed to avoid conflict
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log("Avatar selected:", avatars[selectedAvatar]);
      console.log(data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error(
          "Error setting avatar...Please try again",
          selectOptionToast
        );
      }
    }
  };


  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
        console.log("Fetched avatars:", data);
      } catch (error) {
        console.error("Error fetching avatars:", error);
        // Handle errors, display a message, or retry fetching avatars
      }
    };

    fetchAvatars();
  }, [api]);




  const handleAvatarSelect = (index) => {
    setSelectedAvatar(index);
    console.log("Selected avatar index:", index);
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="loader" className="Loader" />
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>Pick an avatar as your profile picture.</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => handleAvatarSelect(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set As Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .Loader {
    max-inline-size: 100%;
    height: 75%;
  }

  .title {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
