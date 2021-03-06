import AnimePreview from "components/AnimePreview"
import AnimeForm from "components/AnimeForm"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import Modal from "components/Modal"

export default function Radio({ list }) {
  const [showModal, setShowModal] = useState(false)
  const [nameFilter, setNameFilter] = useState("")
  const [seasonFilter, setSeasonFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [filteredList, setFilteredList] = useState(list)
  const { data: session } = useSession()

  useEffect(() => {
    setFilteredList(
      list.filter(
        (e) =>
          filterByName(e.name) &&
          filterBySeason(e.season) &&
          filterByYear(e.year)
      )
    )
  }, [nameFilter, seasonFilter, yearFilter])

  const filterByName = (name) => {
    return name.toLowerCase().includes(nameFilter.toLowerCase())
  }

  const filterBySeason = (season) => {
    return season.toLowerCase().includes(seasonFilter.toLowerCase())
  }
  const filterByYear = (year) => {
    return year.toString().includes(yearFilter)
  }

  return (
    <article>
      <Head>
        <title>Invernalia</title>
        <meta
          name="description"
          content="Reseñas de anime por ReventandoOtrosMundos. En ReventandoOtrosMundos los Domingos 22Hs GMT-3 se transmiten las reseñas a los animes de temporada en Invernalia, emitido por la radio online JapanNext."
        />
        <meta
          name="keywords"
          content="Reventando, otros, Mundos, Anime, Invernalia, Myullnir, radio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        {session && session.user.group === "Admin" && (
          <button
            onClick={() => setShowModal(!showModal)}
            className={styles.button}
          >
            + Add Anime +
          </button>
        )}
        <form className={styles.filter}>
          <label>Name</label>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className={styles.input}
          />
          <label>Year</label>
          <input
            type="number"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className={styles.input}
          />
          <label>Season</label>
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className={styles.select}
          >
            <option value={""}> </option>
            <option value={"winter"}>Winter</option>
            <option value={"spring"}>Spring</option>
            <option value={"summer"}>Summer</option>
            <option value={"autumn"}>Autumn</option>
          </select>
        </form>
        {list.length === 0 && <h2>No hay animes en la lista</h2>}
        <ul className={styles.list}>
          {filteredList
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((e) => (
              <AnimePreview
                key={e.id}
                name={e.name}
                cover={e.cover}
                score={e.score}
                id={e.id}
              />
            ))}
        </ul>
      </section>
      {showModal && (
        <Modal onClose={setShowModal}>
          <AnimeForm onClose={setShowModal} />
        </Modal>
      )}
    </article>
  )
}

export async function getServerSideProps() {
  try {
    await connectDB()
    const res = await Anime.find({})

    const list = res.map((doc) => {
      const anime = doc.toJSON()
      anime.id = doc.id.toString()
      return anime
    })
    return { props: { list } }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
