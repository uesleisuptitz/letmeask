import React, { useCallback, useState, useEffect } from "react";
import { IMAGES } from "../assets";
import { Button, RoomCode } from "../components";
import { useParams } from "react-router-dom";
import { useAuth } from "../context";
import "../styles/room.scss";
import { database } from "../services/firebase";

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      let { questions = {}, title = "Sala sem título" } = room.val();
      if (questions) {
        let parsedQuestions = Object.entries(questions).map((array) => ({
          id: array[0],
          ...array[1],
        }));
        setQuestions(parsedQuestions);
      }
      setRoomTitle(title);
    });
  }, [roomId]);

  const handleCreateNewQuestion = useCallback(
    async (e) => {
      e.preventDefault();
      if (newQuestion.trim() === "") return;
      if (!user)
        throw new Error("Você deve entrar para fazer uma pergunta ; )");
      let question = {
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await database.ref(`rooms/${roomId}/questions`).push(question);
      setNewQuestion("");
    },
    [newQuestion]
  );

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={IMAGES.logo} alt="Letme Ask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          <span>
            {questions.length > 0
              ? `${questions.length} pergunta(s)`
              : "Sem perguntas"}
          </span>
        </div>
        <form onSubmit={handleCreateNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            value={newQuestion}
            onChange={({ target: { value: v } }) => setNewQuestion(v)}
          />
          <div className="form-footer">
            {user?.uid ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.{" "}
              </span>
            )}
            <Button type="submit" disabled={!user?.uid}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Room;
