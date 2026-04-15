import styles from "../loginPages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;
    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username: email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/signin");
      } else {
        setError("Email taken");
      }
    } catch (err) {
      setError("Try again");
    }
  };
  return (
    <div className={styles.body}>
      <section className="registerPage">
        <div className={styles.main}>
          <form onSubmit={handleSubmit}>
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
