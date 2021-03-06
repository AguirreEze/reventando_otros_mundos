import AnimeReview from "components/AnimeReview"
import Head from "next/head"
import Image from "next/image"
import styles from "./styles.module.scss"
import { useState } from "react"
import EditIcon from "components/Icons/EditIcon"
import { useSession } from "next-auth/react"
import AnimeForm from "components/AnimeForm"
import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import Modal from "components/Modal"

export default function AnimePage({ data }) {
  const [showModal, setShowModal] = useState(false)
  const { data: session } = useSession()

  const review = {
    comentary: data.comentary,
    score: data.score,
    watched: data.watched,
    episodes: data.episodes,
    state: data.state,
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>Invernalia | {data.name}</title>
        <meta
          name="description"
          content={`Reseña de anime ${data.name} por ReventandoOtrosMundos.`}
        />
        <meta
          name="keywords"
          content="Reventando, otros, Mundos, Anime, Invernalia, Myullnir, JapanNext, radio, reseña"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && session.user.group === "Admin" && (
        <EditIcon
          className={styles.editIcon}
          onClick={() => setShowModal(true)}
        />
      )}
      {showModal && (
        <Modal onClose={setShowModal}>
          <AnimeForm onClose={setShowModal} data={data} />
        </Modal>
      )}
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

export const getServerSideProps = async (context) => {
  const { params } = context
  const { id } = params
  try {
    await connectDB()
    const res = await Anime.findById(id)
    const data = res.toJSON()
    data.id = data.id.toString()

    if (res) return { props: { data } }
    return {
      notFound: true,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
