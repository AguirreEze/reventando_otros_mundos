import AnimeReview from "components/AnimeReview"
import Image from "next/image"
import connectDB from "middleware/mongo"
import Anime from "models/Anime"

import styles from "./styles.module.css"
import { AnimeType } from "types"
import EditButton from "components/EditButton"

export async function generateMetadata({ params }: { params: { id: string } }) {
  await connectDB()
  const res = await Anime.findById(params.id)
  const data: AnimeType = res.toJSON()
  data.id = data.id.toString()

  return {
    title: `Invernalia | ${data.name}`,
    description: `Reseña de anime ${data.name} por ReventandoOtrosMundos.`,
    keywords:
      "Reventando, otros, Mundos, Anime, Invernalia, Myullnir, JapanNext, radio, reseña",
  }
}

export default async function AnimePage({
  params,
}: {
  params: { id: string }
}) {
  await connectDB()
  const res = await Anime.findById(params.id)
  const data: AnimeType = res.toJSON()
  data.id = data.id.toString()

  const review = {
    comentary: data.comentary,
    score: data.score,
    watched: data.watched,
    episodes: data.episodes,
    state: data.state,
  }

  return (
    <section className={styles.container}>
      <EditButton modalValue={{ type: "UPDATE_ANIME", payload: data }} />
      <header>
        <h1 className={styles.title}>{data.name}</h1>
      </header>
      <article className={styles.data}>
        <section className={styles.cover_container}>
          <Image
            src={data.cover}
            alt={`${data.name} cover`}
            width={250}
            height={320}
            priority
          />
        </section>
        <section className={styles.anime_info}>
          <h2 className={styles.subTitle}>estudio</h2>
          <p className={styles.description}>{data.studio}</p>
          <h2 className={styles.subTitle}>generos</h2>
          <ul className={styles.list}>
            {data.genres.map((e) => (
              <li key={e} className={styles.genre}>
                {e}
              </li>
            ))}
          </ul>
          <h2 className={styles.subTitle}>temporada</h2>
          <p className={styles.description}>
            {data.season} {data.year}
          </p>
          <h2 className={styles.subTitle}>episodios</h2>
          <p className={styles.description}>
            {data.episodes ? data.episodes : "?"}
          </p>
        </section>
        <footer className={styles.sinopsis}>
          <h2 className={styles.subTitle}>sinopsis</h2>
          <p className={styles.description}>{data.sinopsis}</p>
        </footer>
      </article>
      <article className={styles.article}>
        <header className={styles.title}>
          <h1>Review</h1>
        </header>
        <AnimeReview review={review} id={data.id} />
      </article>
    </section>
  )
}
