import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

import io from "socket.io-client";

import "./Room.css";
import { useAuthContext } from "../../AuthContext";

// Components
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";

// Graphql
const ROOM = gql`
  query GetRoom($roomId: ID!) {
    room(roomId: $roomId) {
      _id
      name
      picture
      description
      users
      messages {
        _id
        timestamp
        content
        username
        userAvatar
      }
    }
  }
`;

const SOCKET_SERVER_URL = "http://localhost:8003";

const Room = () => {
  const { roomId } = useParams();

  // graphql
  const { loading, error, data } = useQuery(ROOM, { variables: { roomId } });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState(null);
  const users = (room && room.users) || [];

  const { user } = useAuthContext();

  // WebSocket Client
  const socketRef = useRef(null);

  useEffect(() => {
    if (!loading && !error && data) {
      setRoom(data.room);
      setMessages(data.room.messages);
    }
  }, [loading, error, data]);

  // WebSocket with Node js Chat Server using Socket IO
  useEffect(() => {
    // create socket connection and store it in the ref
    socketRef.current = io(SOCKET_SERVER_URL);

    // listen for messages from the server
    socketRef.current.on("message", (message) => {
      // handle received message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // WebSocket with Java Chat service using Stomp & SockJS
  // useEffect(() => {
  //   const socket = new SockJS("http://localhost:8081/ws");
  //   const client = new Client({
  //     webSocketFactory: () => socket,
  //     reconnectDelay: 5000,
  //     debug: (str) => console.log(str),
  //     onConnect: () => {
  //       console.log("ROOM_WEBSOCKET_CONNECTED");
  //       client.subscribe("/topic/message", (msg) => {
  //         console.log("ROOM_RECEIVE_MESSAGE: ", {
  //           message: JSON.parse(msg.body),
  //         });
  //         const receivedMessage = JSON.parse(msg.body);
  //         setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.error(frame.headers["message"]);
  //       console.error("ROOM_WEBSOCKET_ERROR: ", frame.body);
  //     },
  //   });

  //   socketRef.current = client;
  //   client.activate();

  //   return () => {
  //     client.deactivate();
  //   };
  // }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    const message = {
      roomId: roomId,
      username: user.username,
      userAvatar: user.avatar,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (socketRef.current && socketRef.current.connected) {
      // WebSocket with Java Chat service using Stomp & SockJS
      // socketRef.current.publish({
      //   destination: "/app/message",
      //   body: JSON.stringify(message),
      // });

      // WebSocket with NodeJs
      socketRef.current.emit("message", message);
    }
    setNewMessage("");
  };

  // render room info
  const renderRoomInfo = () => {
    if (!room) return null;
    return (
      <div className="room-info">
        <img
          className="room-picture"
          src={`http://localhost:8000${room.picture}`}
          alt={room.name}
        />
        <div className="room-details">
          <h1 className="room-name">{room.name}</h1>
          <p className="room-description">{room.description}</p>
        </div>
      </div>
    );
  };

  const handleNewMessageSubmit = (event) => {
    event.preventDefault();
  };

  // render input box
  const renderInputForm = () => {
    return (
      <form onSubmit={sendMessage} className="message-input-form">
        <input
          type="text"
          className="message-input"
          name="message-input"
          id="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    );
  };

  // render chat window
  const renderChatWindow = () => {
    if (!messages) return null;
    return (
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <img
                src={`http://localhost:8001${message.userAvatar}`}
                alt={message.username}
              />
              {message.username}: {message.content}
            </div>
          ))}
        </div>
        {renderInputForm()}
      </div>
    );
  };

  // render user list
  const renderUserList = () => {
    return (
      <div className="users-list">
        <h3>Joined Users</h3>
        <ul>
          {users.map((user, index) => {
            if (!user) return null;
            return <li key={index}>User ID: {user}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="room-container">
      {renderRoomInfo()}
      <ChatWindow
        messages={messages}
        sendMessage={sendMessage}
        messageOnChange={(e) => setNewMessage(e.target.value)}
        newMessage={newMessage}
      />
      <UserList users={users} />
    </div>
  );
};

export default Room;
