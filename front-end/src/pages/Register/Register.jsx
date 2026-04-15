import styles from "../loginPages.module.css";
import styles2 from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = () => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className={styles.body}>
      <section className="registerPage">
        <div className={styles.main}>
          <form>
            <p className={styles.signTitle}>Register</p>
            <Link to="/signin" className={styles.switchPage}>
              or Sign in?
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
            <div className={styles.passwordDiv}>
              <input
                name="confirm"
                className={styles.password}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <button type="submit" className={styles.signButton}>
              Join us!
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
