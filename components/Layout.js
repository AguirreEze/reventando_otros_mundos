import styles from "styles/Layout.module.scss"
import Navbar from "./Navbar"

export default function Layout({ children }) {
  console.log(styles)
  return (
    <div className={styles.background}>
      <main className={styles.view}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
