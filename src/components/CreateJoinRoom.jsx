// react
import React, { useState, useEffect, useRef, useContext } from "react";

// components
import { DisplayContext } from "../context/DisplayContext";
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";

const CreateJoinRoom = () => {
  const [createScreen, setCreateScreen] = useState(true);
  const [username, setUsername] = useState("");
  const [roomcodeinput, setRoomcodeinput] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(); // by default empty, so username is not valid
  const [roomcodeValidation, setRoomcodeValidation] = useState(); // by default empty, so roomcode is not valid

  const usernameElement = useRef(null);

  const { setPage } = useContext(DisplayContext);
  const { userList, setUserList } = useContext(UserContext);
  const socket = useSocket();

  const createRoom = () => {
    if (usernameValidation) {
      socket.emit("createRoom", username);
    } else {
      setUsernameValidation(false);
    }
  };

  const joinRoom = () => {
    if (roomcodeValidation) {
      socket.emit("joinRoom", username, roomcodeinput);
    } else {
      setRoomcodeValidation(false);
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      if (createScreen) {
        createRoom();
      } else {
        joinRoom();
      }
    }
  };

  const handleUserName = (e) => {
    setUsername(e.target.value.trim());
    if (e.target.value.trim() !== "") {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  };

  const handleRoomcode = (e) => {
    setRoomcodeinput(e.target.value.trim());
    if (e.target.value.trim() !== "") {
      setRoomcodeValidation(true);
    } else {
      setRoomcodeValidation(false);
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

      // const userObj = {
      //   userId,
      //   userName,
      //   ownerRoom: [roomCode],
      //   memberRoom: [roomCode],
      // };

      // setUserList([...userList, userObj]);

      // return <CreatePage roomCode={roomCodeEmitted} />;
      setPage(`create:${roomCode}:${userName}`); // Change the page state
    });

    socket.on("roomJoined", (result) => {
      const { roomCode, userList: resultUserList, joineeName } = result;

      console.log(resultUserList);

      setUserList([...resultUserList]);

      // return <CreatePage roomCode={roomCodeEmitted} />;
      setPage(`create:${roomCode}:${joineeName}:joinee`); // Change the page state
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("roomCreated");
      socket.off("roomJoined");
    };
  }, []);

  const toggleScreen = () => {
    setCreateScreen(!createScreen);
  };
  return (
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
                  onKeyDown={(e) => handleEnterSubmit(e)}
                  onChange={(e) => handleRoomcode(e)}
                  className={`bg-lightColor2 dark:bg-darkColor1 text-lg px-2 rounded ${
                    roomcodeValidation === false
                      ? "outline outline-red-500 focus:outline focus:outline-red-500"
                      : ""
                  } focus:outline focus:outline-blueColor1 py-2`}
                  type="text"
                />
                {roomcodeValidation === false ? (
                  <div className="text-red-500">Room Code is mandatory</div>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="mx-auto">
            <button
              onClick={createScreen ? createRoom : joinRoom}
              className="p-2 w-[10rem] bg-blueColor1 text-lightColor1 rounded-full transition-all text-lg hover:bg-blueColor2 hover:cursor-pointer"
            >
              {createScreen ? "Create" : "Join"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJoinRoom;
