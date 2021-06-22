import React from "react";
import { IMAGES } from "../assets";
import { Button } from "../components";
import "../styles/auth.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../context";

const NewRoom = () => {
  const { user } = useAuth();

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
          <form>
            <input type="text" placeholder="Nome da sala" />
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
