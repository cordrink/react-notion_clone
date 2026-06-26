import { useState, type SubmitEventHandler } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import styles from "../utils.module.css";
import { useAuthSession } from "./AuthSessionContext";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { session } = useAuthSession();

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;

      alert("Check your email for the login link!");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.centeredFlex}>
      <div>
        <h1>Cod-Rink Notes App</h1>
        <p>Connectez-vous via magic link avec votre email ci-dessous.</p>
        {loading ? (
          "Evnvoi du magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
            />
            <button>Envoyer magic link</button>
          </form>
        )}
      </div>
    </div>
  );
}
