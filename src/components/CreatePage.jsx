// react
import React, { useState, useContext, useEffect, useRef } from "react";

// clipboard
import clipboard from "clipboard-copy";

// context
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";
import { ThemeContext } from "../context/ThemeContext";

// mui
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";

// components
import ConfigurationSection from "./ConfigurationSection";
import Canvas from "./Canvas";

const CreatePage = ({ roomCode, ownerName, joineeName }) => {
  const chatContainerRef = useRef(null);

  const { userList, setUserList } = useContext(UserContext);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [finalOwner, setFinalOwner] = useState("");
  const [currentJoineeName, setCurrentJoineeName] = useState("");
  const [switchToCanvas, setSwitchToCanvas] = useState(false);

  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    clipboard(roomCode)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleTextMessage = (e) => {
    setTextMessage(e.target.value);
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      // console.log(currentJoineeName);
      if (textMessage.trim() !== "") {
        socket.emit(
          "getMessage",
          currentJoineeName,
          roomCode,
          textMessage.trim()
        );
      }
      setTextMessage("");
    }
  };

  const handleClickSubmit = () => {
    // console.log(currentJoineeName);
    if (textMessage.trim() !== "") {
      socket.emit(
        "getMessage",
        currentJoineeName,
        roomCode,
        textMessage.trim()
      );
    }
    setTextMessage("");
  };

  const socket = useSocket();

  useEffect(() => {
    // console.log(userList.filter((u) => u["memberRoom"].includes(roomCode)));
    setDisplayUsers(userList.filter((u) => u["memberRoom"].includes(roomCode)));
  }, [userList]);

  useEffect(() => {
    socket.on("roomJoined", (result) => {
      const {
        roomCode: joinedRoomCode,
        userList: resultUserList,
        joineeName,
      } = result;
      if (joinedRoomCode === roomCode) {
        setUserList([...resultUserList]);
        setNotifs((prevNotifs) => [
          ...prevNotifs,
          {
            notifId:
              prevNotifs.length > 0
                ? prevNotifs[prevNotifs.length - 1].notifId + 1
                : 1,
            notifType: "joined",
            notifData: `${joineeName} has joined the room`,
          },
        ]);

        // Scroll to the end of the chat container
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }
    });

    socket.on("roomLeft", (userId, userName, leftRoomCode) => {
      if (roomCode === leftRoomCode) {
        setNotifs((prevNotifs) => [
          ...prevNotifs,
          {
            notifId:
              prevNotifs.length > 0
                ? prevNotifs[prevNotifs.length - 1].notifId + 1
                : 1,
            notifType: "left",
            notifData: `${userName} has left the room`,
          },
        ]);

        setDisplayUsers((prev) => {
          console.log(prev);
          return prev.filter((u) => u.userId !== userId);
        });

        // Scroll to the end of the chat container
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }
    });

    socket.on("sendMessage", (result) => {
      const { senderRoomCode, message, senderName } = result;

      // console.log("got message");
      // console.log(senderRoomCode);
      // console.log(roomCode);

      if (senderRoomCode === roomCode) {
        setNotifs((prevNotifs) => [
          ...prevNotifs,
          {
            notifId:
              prevNotifs.length > 0
                ? prevNotifs[prevNotifs.length - 1].notifId + 1
                : 1,
            notifType: "message",
            notifData: {
              message,
              senderName,
            },
          },
        ]);

        // Scroll to the end of the chat container
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight + 12;
        }
      }
    });

    // set owner name
    if (ownerName.trim() !== "") {
      setFinalOwner(ownerName);
      setCurrentJoineeName(ownerName);
    } else {
      setCurrentJoineeName(joineeName);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("roomJoined");
      socket.off("roomLeft");
      socket.off("sendMessage");
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
      <div className="bg-lightColor1 col-span-12 pt-4 flex flex-col items-center rounded-md md:col-span-4 dark:bg-darkColor2">
        <div className="bg-lightColor2 h-fit w-full mx-4 py-2 text-center dark:bg-darkColor1">
          <h1 className="text-4xl">Users</h1>
        </div>
        <Box className="flex  space-x-8 h-fit w-fit py-2 px-4 mt-8  rounded-md bg-lightColor2 dark:bg-darkColor1">
          <div>Room Code </div>
          <div className="flex space-x-2">
            <div className="text-blueColor1">{roomCode}</div>
            <div
              className="hover:cursor-pointer"
              onClick={handleCopyToClipboard}
            >
              <ContentCopyIcon fontSize="small" />
            </div>
          </div>
        </Box>

        {copied ? (
          <div className="text-blueColor1 mt-2 text-sm">Copied!</div>
        ) : null}
        <div className="mt-8 text-center w-full">
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
              // console.log(displayUsers);
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
              <h2>{finalOwner}</h2>
            </div>
          )}
        </div>
      </div>
      {/* Middle - Settings/Canvas 
      {switchToCanvas ? (
        <Canvas />
      ) : (
        <ConfigurationSection
          roomCode={roomCode}
          setSwitchToCanvas={setSwitchToCanvas}
        />
      )} */}

      {/* Right Side - Chatbox */}
      <div className="bg-lightColor1 col-span-12 pt-4 pb-2 flex flex-col rounded-md md:col-span-8 dark:bg-darkColor2">
        <div
          ref={chatContainerRef}
          className="flex-1 pb-6 max-h-[25rem] overflow-auto "
        >
          {notifs.map((notif) => {
            switch (notif.notifType) {
              case "joined":
              case "left":
                return (
                  <div
                    key={notif.notifId}
                    className="text-blueColor1 pb-2 px-4"
                  >
                    <h2>{notif.notifData}</h2>
                  </div>
                );
              case "message":
                return (
                  <div key={notif.notifId} className="pb-2 px-4">
                    <h2>
                      <span className="text-blueColor1">
                        {notif.notifData.senderName}:
                      </span>{" "}
                      {notif.notifData.message}
                    </h2>
                  </div>
                );
              default:
                console.log("INVALID NOTIF TYPE");
            }
          })}
        </div>
        <div className="flex mt-4 space-x-4 px-4">
          <div className="w-full border-1 border-red-600">
            <input
              value={textMessage}
              onKeyDown={(e) => handleEnterSubmit(e)}
              onChange={(e) => handleTextMessage(e)}
              placeholder="Enter your guess here"
              className="bg-lightColor2 rounded w-full outline-none outline-offset-0 focus:outline-1 focus:outline-blueColor1 px-2 py-2 dark:bg-darkColor1"
              type="text"
            />
          </div>
          <button
            onClick={handleClickSubmit}
            className=" border-1 px-4 py-2 border-green-500 rounded bg-blueColor1 hover:bg-blueColor2"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
