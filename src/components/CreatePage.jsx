// react
import React, { useState, useContext, useEffect } from "react";

// context
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";

// components
import ConfigurationSection from "./ConfigurationSection";

const CreatePage = ({ roomCode, ownerName }) => {
  const { userList, setUserList } = useContext(UserContext);
  const [displayUsers, setDisplayUsers] = useState([]);

  const socket = useSocket();

  // const [ownerUser, setOwnerUser] = useState({});

  useEffect(() => {
    setDisplayUsers(userList.filter((u) => u["memberRoom"].includes(roomCode)));
  }, [userList]);

  useEffect(() => {
    socket.on("roomJoined", (result) => {
      const { roomCode, userList: resultUserList } = result;

      console.log(resultUserList);

      setUserList([...resultUserList]);
    });

    socket.on("roomLeft", (userId) => {
      setDisplayUsers((prev) => prev.filter((u) => u.userId !== userId));
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("roomJoined");
      socket.off("roomLeft");
    };
  }, []);

  const sampleList = [
    "the_maverick007Z",
    "vishal",
    "krishnaveni",
    "ankita",
    "senhashis",
    "abbas",
    "karthick",
    "pankaj",
    "varshaa",
    "shloak",
  ];

  return (
    <div className="w-screen min-h-[30rem] border-1 px-4 border-red-500 grid grid-cols-12 md:space-x-3">
      {/* Left Side - Player List */}
      <div className="bg-lightColor1 col-span-12 pt-4 flex flex-col items-center rounded-md md:col-span-2 dark:bg-darkColor2">
        <div className="bg-lightColor2 h-fit w-full mx-4 py-2 text-center dark:bg-darkColor1">
          <h1 className="text-4xl">Players</h1>
        </div>
        <div className="mt-8 w-full">
          {/* {sampleList.map((user) => {
            return (
              <div className="bg-lightColor2 dark:bg-darkColor1 mb-2 py-1 pl-2">
                <h2>{user}</h2>
              </div>
            );
          })} */}
          {displayUsers && displayUsers.length > 0 ? (
            displayUsers.map((userInRoom) => {
              // console.log("inside map");
              // console.log(usersInRoom);
              // console.log(userInRoom);
              return (
                <div
                  key={userInRoom.userId}
                  className="bg-lightColor2 dark:bg-darkColor1 mb-2 py-1 pl-2"
                >
                  <h2>{userInRoom.userName}</h2>
                </div>
              );
            })
          ) : (
            <div className="bg-lightColor2 dark:bg-darkColor1 mb-2 py-1 pl-2">
              <h2>{ownerName}</h2>
            </div>
          )}
        </div>
      </div>
      {/* Middle - Settings/Canvas  */}
      <ConfigurationSection roomCode={roomCode} />
      {/* Right Side - Chatbox */}
      <div className="bg-lightColor1 col-span-12 pt-4 flex justify-center rounded-md md:col-span-2 dark:bg-darkColor2">
        <div className="bg-lightColor2 h-fit w-full mx-4 py-2 text-center dark:bg-darkColor1">
          <h1 className="text-4xl">Players</h1>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
