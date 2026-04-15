import styles from "../loginPages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {};
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
                placeholder="Email"
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
