import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { auth, firebase } from "../services/firebase";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  signInWithGoogle: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        const { displayName: name, photoURL: avatar, uid } = loggedUser;
        if (!name || !avatar) {
          throw new Error("Conta Google sem nome ou foto!");
        } else {
          setUser({ name, avatar, uid });
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async (sucessCallback) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result?.user) {
      const { displayName: name, photoURL: avatar, uid } = result.user;
      if (!name || !avatar) {
        throw new Error("Conta Google sem nome ou foto!");
      } else {
        setUser({ name, avatar, uid });
        if (sucessCallback) sucessCallback();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
