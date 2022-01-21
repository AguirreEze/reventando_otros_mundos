import Anime from "components/Anime"
import Head from "next/head"
import { useState } from "react"
import styles from "./styles.module.scss"

export default function Radio() {
  const [list, setList] = useState([])
  return (
    <article>
      <Head>
        <title>Invernalia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container}>
        <h1 className={styles.title}>Invernalia</h1>
        <p className={styles.description}>
          This animes were reviewed by Myullnir and R
        </p>
        <ul className={styles.list}>
          {list.length === 0 && (
            <>
              <li>
                <Anime />
              </li>
              <li>
                <Anime />
              </li>
              <li>
                <Anime />
              </li>
              <li>
                <Anime />
              </li>
            </>
          )}
        </ul>
      </section>
    </article>
  )
}
