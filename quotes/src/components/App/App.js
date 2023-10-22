import { ReactComponent as ReactLogo } from "../../assets/logo.svg";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <ReactLogo className={styles.appLogo} aria-hidden />
        <p>Edit src/App.js and save to reload.</p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
