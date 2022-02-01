import AnimeReview from "components/AnimeReview"
import { getAnimeByID } from "../../../firebase/client"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "./styles.module.scss"

export default function AnimePage({ data }) {
  return (
    <section>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/radio">
          <a>back</a>
        </Link>
        <h1 className={styles.title}>{data.name}</h1>
      </header>
      <article className={styles.data}>
        <section>
          <Image
            src={data.cover}
            alt={`${data.name} cover`}
            width={250}
            height={320}
          />
        </section>
        <section>
          <h2 className={styles.subTitle}>estudio:</h2>
          <p className={styles.description}>{data.studio}</p>
          <h2 className={styles.subTitle}>generos:</h2>
          <ul className={styles.list}>
            {data.genres.map((e) => (
              <li key={e} className={styles.genre}>
                {e}
              </li>
            ))}
          </ul>
          <h2 className={styles.subTitle}>temporada:</h2>
          <p className={styles.description}>
            {data.season} {data.year}
          </p>
          <h2 className={styles.subTitle}>episodios:</h2>
          <p className={styles.description}>
            {data.episodes ? data.episodes : "?"}
          </p>
        </section>
        <footer className={styles.sinopsis}>
          <h2 className={styles.subTitle}>sinopsis:</h2>
          <p className={styles.description}>{data.sinopsis}</p>
        </footer>
      </article>
      <AnimeReview
        comentary={data.comentary}
        score={data.score}
        watched={data.watched}
        episodes={data.episodes}
        state={data.state}
      />
    </section>
  )
}

export const getServerSideProps = (context) => {
  const { params } = context
  const { id } = params
  return getAnimeByID(id).then((res) => {
    if (res.exists()) {
      const data = res.data()
      return { props: { data } }
    }
    return {
      notFound: true,
    }
  })
}