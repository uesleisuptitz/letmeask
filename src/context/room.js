import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./auth";

export const useRoom = (roomId) => {
  const history = useHistory();
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (roomId) {
      let roomRef = database.ref(`rooms/${roomId}`);
      roomRef.on("value", (room) => {
        if (room.val()) {
          let { questions = {}, title = "Sala sem título" } = room.val();
          if (questions) {
            let parsedQuestions = Object.entries(questions).map(
              ([key, value]) => {
                return {
                  id: key,
                  content: value.content,
                  author: value.author,
                  isHighlighted: value.isHighlighted,
                  isAnswered: value.isAnswered,
                  likeCount: Object.values(value.likes ?? {}).length,
                  likeId: Object.entries(value.likes ?? {}).find(
                    ([_, like]) => like.authorId === user?.uid
                  )?.[0],
                };
              }
            );
            setQuestions(parsedQuestions);
          }
          setRoomTitle(title);
        } else {
          alert("Sala não encontrada!");
          history.push("/");
        }
      });
      return () => {
        roomRef.off("value");
      };
    }
  }, [roomId, user?.uid]);

  return { roomTitle, setRoomTitle, questions, setQuestions };
};
