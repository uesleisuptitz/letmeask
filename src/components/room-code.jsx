import React, { useCallback } from "react";
import { IMAGES } from "../assets";
import "../styles/room-code.scss";

const RoomCode = ({ code }) => {
  const copyRoomCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={IMAGES.copy} alt="Copiar código da sala" />
      </div>
      <span> Sala #{code}</span>
    </button>
  );
};

export default RoomCode;
