import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ onToggle, isVisible, showButton = true }) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      {showButton && (
        <button className={styles.submit} onClick={onToggle}>
          {isVisible ? "Back" : "Add Room"}
        </button>
      )}

      <button className={styles.submit} onClick={() => navigate("/proplist")}>
        Go to proplist
      </button>

      <button className={styles.submit} onClick={() => navigate("/messages")}>
        Messages
      </button>
    </div>
  );
}

export default Header;
