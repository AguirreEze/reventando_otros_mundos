import Head from "next/head"
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
        {loading && (
          <>
            <Head>
              <title>Loading...</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Loading />
          </>
        )  
      }
      {children}
      </main>
    </div>
  )
}
