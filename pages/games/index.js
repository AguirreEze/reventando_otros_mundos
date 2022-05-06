import Head from "next/head"
import Game from "components/Game"
import styles from "pages/games/styles.module.scss"
import { useSession } from "next-auth/react"
import connectDB from "middleware/mongo"
import GameModel from "models/Game"
import GameForm from "components/GameForm"
import { useState } from "react"
import Modal from "components/Modal"

export default function Games({ games }) {
  const [showModal, setShowModal] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Reventando otros Juegos</title>
        <meta
          name="description"
          content="Lista de juegos transmitidos por ReventandoOtrosMundos. En ReventandoOtrosMundos se transmiten principalmente los días Lunes y Jueves juegos clásicos por la plataforma Twitch (twitch.tv/reventandootrosmundos). En esta pagina se encuentra un listado de los juegos ya completados por ReventandoOtrosMundos"
        />
        <meta
          name="keywords"
          content="Reventando, otros, Mundos, Juegos, Stream, Myullnir"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.background}>
        <header>
          <h1 className={styles.title}>Games</h1>
          <p className={styles.description}>
            Estos son los titulos jugados en el stream de Reventando Otros
            Mundos
          </p>
        </header>
        <section className={styles.games}>
          {session && session.user.group === "Admin" && (
            <button
              onClick={() => setShowModal(!showModal)}
              className={styles.button}
            >
              + Add Game +
            </button>
          )}
          <ul className={styles.list}>
            {games
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map(
                ({
                  createdAt,
                  name,
                  completed,
                  gameCover,
                  studio,
                  gameYear,
                  steamLink,
                  id,
                }) => {
                  return (
                    <li key={id}>
                      <Game
                        createdAt={createdAt}
                        name={name}
                        completed={completed}
                        gameCover={gameCover}
                        studio={studio}
                        gameYear={gameYear}
                        steamLink={steamLink}
                        id={id}
                      />
                    </li>
                  )
                }
              )}
          </ul>
        </section>
      </section>
      {showModal && (
        <Modal onClose={setShowModal}>
          <GameForm />
        </Modal>
      )}
    </>
  )
}

export async function getServerSideProps() {
  await connectDB()
  const res = await GameModel.find({})
  const games = res.map((doc) => {
    const game = doc.toJSON()
    game.id = game.id.toString()
    return game
  })
  return { props: { games: games } }
}
