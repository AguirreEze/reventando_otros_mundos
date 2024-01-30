import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import AnimePreview from "components/AnimePreview"

import styles from "./styles.module.css"

export default async function AnimeList({
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
    <ul className={styles.list}>
      {list.length === 0 && <h2>No hay animes en la lista</h2>}
      {filteredList
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .map((anime) => (
          <AnimePreview key={anime.id} anime={anime} />
        ))}
    </ul>
  )
}
