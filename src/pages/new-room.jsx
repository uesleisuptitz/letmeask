import React, { useCallback, useState } from "react";
import { IMAGES } from "../assets";
import { Button } from "../components";
import "../styles/auth.scss";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context";
import { database } from "../services/firebase";

const NewRoom = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  const handleCreateRoom = useCallback(
    async (e) => {
      e.preventDefault();
      if (newRoom.trim() === "") return;
      let roomRef = database.ref("rooms");
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.uid,
      });
      history.push(`/rooms/${firebaseRoom.key}`);
    },
    [newRoom]
  );

  return (
    <div id="page-auth">
      <aside>
        <img
          src={IMAGES.illustration}
          alt="Ilustração simboliznado perguntas e respostas"
        />
        <strong>
          Toda pergunta tem <br />
          uma resposta.
        </strong>
        <p>
          Aprenda e compartilhe conhecimento <br />
          com outras pessoas
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={IMAGES.logo} alt="Logo Letme Ask" />
          <h1>{user && user.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={({ target: { value: v } }) => setNewRoom(v)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            {"Quer entrar em uma sala existente? "}
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
