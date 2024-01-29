import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import ButtonAddItem from "components/ButtonAddItem"
import styles from "./styles.module.css"
import AnimePreview from "components/AnimePreview"
import AnimeFilter from "components/AnimeFilter"
import { Suspense } from "react"

export const metadata = {
  title: "Invernalia",
  description:
    "En ReventandoOtrosMundos se transmiten juegos populares y clásicos, principalmente los días lunes y jueves. Los Sábados se transmite el proceso de crear un personaje de ROL y los Domingos se reseñan los animes de temporada.",
  keywords: "Reventando, otros, Mundos, Anime, Juegos, Myullnir",
}

export default async function RadioPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  await connectDB()
  const res = await Anime.find({})

  const list = res.map((doc) => {
    const anime = doc.toJSON()
    anime.id = doc.id.toString()
    return anime
  })

  const filterByName = (name: string) => {
    return typeof searchParams?.name === "string"
      ? name.toLowerCase().includes(searchParams?.name.toLowerCase())
      : true
  }

  const filterBySeason = (season: string) => {
    return typeof searchParams?.season === "string"
      ? season.toLowerCase().includes(searchParams?.season.toLowerCase())
      : true
  }

  const filterByYear = (year: string) => {
    return typeof searchParams?.year === "string"
      ? year.toString().includes(searchParams?.year)
      : true
  }

  const filterByState = (state: string) => {
    return typeof searchParams?.state === "string"
      ? state.toLowerCase().includes(searchParams?.state)
      : true
  }

  const filteredList = list.filter(
    (e) =>
      filterByState(e.state) &&
      filterByName(e.name) &&
      filterBySeason(e.season) &&
      filterByYear(e.year),
  )

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
        <AnimeFilter />
        {list.length === 0 && <h2>No hay animes en la lista</h2>}
        <Suspense fallback="Loading...">
          <ul className={styles.list}>
            {filteredList
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((anime) => (
                <AnimePreview key={anime.id} anime={anime} />
              ))}
          </ul>
        </Suspense>
      </section>
    </article>
  )
}
