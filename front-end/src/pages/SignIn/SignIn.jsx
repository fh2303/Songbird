import styles from "../loginPages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/groupchat");
      } else {
        setError("Invalid sign in");
      }
    } catch (err) {
      setError("Try again");
    }
  };
  return (
    <div className={styles.body}>
      <section className="sign-in">
        <div className={styles.main}>
          <form onSubmit={handleSubmit}>
            <p className={styles.signTitle}>Sign in</p>
            <Link to="/register" className={styles.switchPage}>
              or Register?
            </Link>
            <div className={styles.usernameDiv}>
              <input
                name="email"
                className={styles.email}
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className={styles.passwordDiv}>
              <input
                name="password"
                className={styles.password}
                type="password"
                placeholder="Password"
                required
              />
            </div>{" "}
            {error && <p className={styles.errorMsg}>{error}</p>}
            <button type="submit" className={styles.signButton}>
              Jump in!
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
