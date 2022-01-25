import styles from "./styles.module.scss"
import Navbar from "components/Navbar"

export default function Layout({ children }) {
  return (
    <div className={styles.background}>
      <main className={styles.view}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
