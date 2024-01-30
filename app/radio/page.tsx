import ButtonAddItem from "components/ButtonAddItem"
import styles from "./styles.module.css"
import AnimeFilter, { SkeletonAnimeFilter } from "components/AnimeFilter"
import { Suspense } from "react"
import AnimeList from "components/AnimeList"
import AnimeLoading from "components/AnimeList/AnimeLoading"

export const metadata = {
  title: "Invernalia",
  description:
    "En ReventandoOtrosMundos se transmiten juegos populares y clásicos, principalmente los días lunes y jueves. Los Sábados se transmite el proceso de crear un personaje de ROL y los Domingos se reseñan los animes de temporada.",
  keywords: "Reventando, otros, Mundos, Anime, Juegos, Myullnir",
}

export default function RadioPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <article>
      <section className={styles.container}>
        <h1 className={styles.title}>Invernalia</h1>
        <p className={styles.description}>
          Estos son los animes vistos y reseñados en el programa Invernalia.
          Domingo 22Hs hora Argentina (GMT-3) en{" "}
          <a
            href="http://japan-next.blogspot.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            JapanNext
          </a>
        </p>
        <ButtonAddItem type="ADD_ANIME" className={styles.button} />
        <Suspense fallback={<SkeletonAnimeFilter />}>
          <AnimeFilter />
        </Suspense>
        <Suspense fallback={<AnimeLoading />}>
          <AnimeList searchParams={searchParams} />
        </Suspense>
      </section>
    </article>
  )
}
