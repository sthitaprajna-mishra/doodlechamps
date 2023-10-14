// react
import React, { useState, useContext, useEffect } from "react";

// context
import { UserContext } from "../context/UserContext";

// components
import ConfigurationSection from "./ConfigurationSection";

const CreatePage = ({ roomCode }) => {
  const { userList } = useContext(UserContext);

  const [ownerUser, setOwnerUser] = useState({});
  const [usersInRoom, setUsersInRoom] = useState([]);

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

  useEffect(() => {
    // console.log(userList);
    // console.log(
    //   userList.filter((userObj) => userObj.memberRoom.includes(roomCode))
    // );

    if (userList.length > 0) {
      // console.log(usersInRoom);

      setUsersInRoom((prev) => {
        const updatedUsers = [...prev]; // Create a copy of the previous state
        userList.forEach((newUser) => {
          const existingUserIndex = updatedUsers.findIndex(
            (user) => user.userId === newUser.userId
          );
          if (existingUserIndex !== -1) {
            // User with the same ID exists, update the data
            updatedUsers[existingUserIndex] = newUser;
          } else {
            // User with a new ID, add to the array
            updatedUsers.push(newUser);
          }
        });
        return updatedUsers; // Set the state with the updated array
      });

      setOwnerUser(
        userList.filter((userObj) => userObj.ownerRoom.includes(roomCode))[0]
      );
    }

    // console.log(usersInRoom);
  }, [userList]);

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
          {usersInRoom && usersInRoom.length > 0
            ? usersInRoom.map((userInRoom) => {
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
            : null}
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
