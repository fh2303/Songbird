import styles from "../loginPages.module.css";
import { useState } from "react";

function SignIn() {
  return (
    <div className={styles.body}>
      <section className="sign-in">
        <div className={styles.main}>
          <form>
            <p className={styles.signTitle}>Sign in</p>
            <div className={styles.usernameDiv}>
              <input name="email" type="email" placeholder="Email" required />
            </div>
            <div className={styles.passwordDiv}>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.signButton}>
                Jump in!
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
