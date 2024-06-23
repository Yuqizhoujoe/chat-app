import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../AuthContext";

import { gql, useMutation } from "@apollo/client";
import axios from "axios";

import "./RoomPage.css";

// Graphql Query and Mutation
const JOIN_ROOM = gql`
  mutation JoinRoom($roomId: ID!, $userId: ID!) {
    joinRoom(roomId: $roomId, userId: $userId) {
      _id
      name
      picture
      description
      users
    }
  }
`;

const RoomPage = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // Graphql
  const [joinRoom] = useMutation(JOIN_ROOM);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8000/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  const handleJoinRoom = async (roomId) => {
    try {
      const response = await joinRoom({
        variables: { roomId, userId: user.userId },
      });
      console.log("ROOM_PAGE_JOIN_ROOM_RESPONSE: ", response);
      navigate(`/rooms/${roomId}`);
    } catch (error) {
      console.error("ROOM_PAGE_JOIN_ROOM_RESPONSE_ERROR: ", error);
    }
  };

  const renderRooms = () => {
    return rooms.map((room) => (
      <div
        key={room._id}
        className="room-card"
        onClick={() => handleJoinRoom(room._id)}
      >
        <h2>{room.name}</h2>
        <img src={`http://localhost:8000${room.picture}`} alt={room.name} />
        <p>{room.description}</p>
      </div>
    ));
  };

  return (
    <div className="rooms-page">
      <button
        className="create-room-button"
        onClick={() => navigate("/rooms/create-room")}
      >
        Create Room
      </button>
      <div className="rooms-grid">{renderRooms()}</div>
    </div>
  );
};

export default RoomPage;
