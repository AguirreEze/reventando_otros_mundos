import styles from "./styles.module.scss"
import Navbar from "components/Navbar"
import Loading from "components/Loading"
import useLoading from "hooks/useLoading"

export default function Layout({ children }) {
  const { loading } = useLoading()
  return (
    <div className={styles.background}>
      <main className={styles.view}>
        <Navbar />
        {loading ? <Loading /> : children}
      </main>
    </div>
  )
}
