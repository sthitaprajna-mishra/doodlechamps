// react
import React, { useState, useEffect, useRef, useContext } from "react";

// context
import { ThemeContext } from "../context/ThemeContext";
import { DisplayContext } from "../context/DisplayContext";
import { UserContext } from "../context/UserContext";

// assets
import darklogo from "../assets/logo_dark_2.png";
import lightlogo from "../assets/logo_light.png";

// sockets
import io from "socket.io-client";
import CreatePage from "./CreatePage";

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

const LandingPage = () => {
  const [createScreen, setCreateScreen] = useState(true);
  const [username, setUsername] = useState("");
  const [roomcodeinput, setRoomcodeinput] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(); // by default empty, so username is not valid

  const usernameElement = useRef(null);

  const { theme } = useContext(ThemeContext);
  const { setPage } = useContext(DisplayContext);
  const { userList, setUserList } = useContext(UserContext);

  const createRoom = () => {
    if (usernameValidation) {
      socket.emit("createRoom", username);
    } else {
      setUsernameValidation(false);
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      createRoom();
    }
  };

  const handleUserName = (e) => {
    console.log(e);
    setUsername(e.target.value.trim());
    if (e.target.value.trim() !== "") {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  };

  useEffect(() => {
    // focus on username input
    usernameElement.current.focus();
  }, [createScreen]);

  useEffect(() => {
    // Listen for the 'roomCreated' event
    socket.on("roomCreated", (result) => {
      const {
        roomCode,
        userData: { userId, userName },
      } = result;

      const userObj = {
        userId,
        userName,
        ownerRoom: [roomCode],
        memberRoom: [roomCode],
      };

      setUserList([...userList, userObj]);

      // return <CreatePage roomCode={roomCodeEmitted} />;
      setPage(`create:${roomCode}`); // Change the page state
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("roomCreated");
    };
  }, []);

  const toggleScreen = () => {
    setCreateScreen(!createScreen);
  };

  return (
    <>
      {/* Header */}
      {theme === "light" ? (
        <div className="flex justify-center mx-auto bg-lightColor1 pb-1 rounded-md">
          <img className="h-24 md:h-32" src={lightlogo} alt="light logo" />
        </div>
      ) : (
        <div className="flex justify-center mx-auto bg-darkColor1 rounded-md">
          <img className="h-24 md:h-32" src={darklogo} alt="dark logo" />
        </div>
      )}

      <div className="flex flex-col mt-8 min-h-[16rem] md:flex-row border-1">
        <div className="text-center flex items-center text-2xl md:text-4xl md:w-1/2">
          <div className="py-8 md:py-0 md:p-16">
            Unleash your creativity in this free online multiplayer drawing and
            guessing game, where champions are born one{" "}
            <span className="text-blueColor1 font-bold">doodle</span> at a time!
          </div>
        </div>
        <div className="flex space-x-4 md:pr-16 md:w-1/2 border-1">
          <div className="w-full pb-2 bg-lightColor1 dark:bg-darkColor2">
            <div className="flex mb-2 border-1">
              <div
                onClick={toggleScreen}
                className={`w-1/2 py-4 text-center ${
                  createScreen
                    ? "text-blueColor1"
                    : "bg-lightColor2 dark:bg-darkColor1"
                } text-xl font-semibold border-r border-lightColor2 dark:border-darkColor1 hover:transition-all hover:cursor-pointer`}
              >
                Create Room
              </div>
              <div
                onClick={toggleScreen}
                className={`w-1/2 py-4 text-center ${
                  !createScreen
                    ? "text-blueColor1"
                    : "bg-lightColor2 dark:bg-darkColor1"
                } text-xl font-semibold   hover:transition-all hover:cursor-pointer`}
              >
                Join Room
              </div>
            </div>
            {/* Screen */}
            <div className="flex items-center justify-center border-1">
              <div className="flex flex-col border-1 justify-center space-y-6 w-3/4 h-full">
                <div className="flex flex-col mt-2 space-y-2">
                  <label className="text-xl">Username</label>
                  <input
                    ref={usernameElement}
                    value={username}
                    onKeyDown={(e) => handleEnterSubmit(e)}
                    onChange={(e) => handleUserName(e)}
                    className={`bg-lightColor2 dark:bg-darkColor1 text-lg px-2 rounded ${
                      usernameValidation === false
                        ? "outline outline-red-500 focus:outline focus:outline-red-500"
                        : ""
                    } focus:outline focus:outline-blueColor1 py-2`}
                    type="text"
                  />
                  {usernameValidation === false ? (
                    <div className="text-red-500">Username is mandatory</div>
                  ) : null}
                  {!createScreen ? (
                    <>
                      <label className="text-xl">Room Code</label>
                      <input
                        value={roomcodeinput}
                        onChange={(e) =>
                          e.target.value.trim() !== ""
                            ? setRoomcodeinput(e.target.value)
                            : null
                        }
                        className="bg-lightColor2 dark:bg-darkColor1 text-lg px-2 rounded focus:outline focus:outline-blueColor1 py-2"
                        type="text"
                      />
                    </>
                  ) : null}
                </div>
                <div className="mx-auto">
                  <button
                    onClick={createScreen ? createRoom : null}
                    className="p-2 w-[10rem] bg-blueColor1 text-lightColor1 rounded-full transition-all text-lg hover:bg-blueColor2 hover:cursor-pointer"
                  >
                    {createScreen ? "Create" : "Join"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
