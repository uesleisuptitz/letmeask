import React, { useCallback } from "react";
import { IMAGES } from "../assets";
import { Button, RoomCode, Question } from "../components";
import { useHistory, useParams } from "react-router-dom";
import { useAuth, useRoom } from "../context";
import "../styles/room.scss";
import { database } from "../services/firebase";

const AdminRoom = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { id: roomId } = useParams();
  const { questions, roomTitle } = useRoom(roomId);

  const handleCheckQuestionAnswered = useCallback(
    async (questionId, isAnswered = false) => {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .update({ isAnswered: !isAnswered });
    },
    [roomId]
  );

  const handleHighlightQuestion = useCallback(
    async (questionId, isHighlighted = false) => {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: !isHighlighted,
      });
    },
    [roomId]
  );

  const handleDeleteQuestion = useCallback(
    async (questionId) => {
      if (
        window.confirm("Tem certeza que você deseja excluir essa pergunta?")
      ) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      }
    },
    [roomId]
  );

  const handleEndRoom = useCallback(async () => {
    if (window.confirm("Tem certeza que você deseja fechar essa sala?")) {
      await database.ref(`rooms/${roomId}`).update({
        closedAt: new Date(),
      });
      history.push("/");
    }
  }, [roomId]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={IMAGES.logo} alt="Letme Ask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
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

        <div className="question-list">
          {questions.map(
            ({
              content = "",
              author = {},
              id = "",
              isAnswered = false,
              isHighlighted = false,
            }) => (
              <Question
                content={content}
                author={author}
                key={id}
                isHighlighted={isHighlighted}
                isAnswered={isAnswered}
              >
                <button
                  type="button"
                  onClick={() => handleCheckQuestionAnswered(id, isAnswered)}
                >
                  <img
                    src={IMAGES.check}
                    alt="Marcar pergunta como respondida"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleHighlightQuestion(id, isHighlighted)}
                >
                  <img src={IMAGES.answer} alt="Destacar pergunta" />
                </button>
                <button type="button" onClick={() => handleDeleteQuestion(id)}>
                  <img src={IMAGES.delete_} alt="Remover pergunta" />
                </button>
              </Question>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
