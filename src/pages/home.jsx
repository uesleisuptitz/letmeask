import React, { useCallback } from "react";
import { IMAGES } from "../assets";
import { Button } from "../components";
import { useHistory } from "react-router-dom";
import "../styles/auth.scss";
import { useAuth } from "../context";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const handleCreateRoom = useCallback(async () => {
    if (!user) await signInWithGoogle(() => history.push("/rooms/new"));
    else history.push("/rooms/new");
  }, [user]);

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={IMAGES.googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código do sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
