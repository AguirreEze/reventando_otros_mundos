import { Suspense } from "react"
import Game from "components/Game"
import ButtonAddItem from "components/ButtonAddItem"

import connectDB from "middleware/mongo"
import GameModel from "models/Game"

import { GameType } from "types"
import styles from "./styles.module.css"
import GamesLoading from "./loading"

export const metadata = {
  title: "Reventando Otros Mundos",
  description:
    "En ReventandoOtrosMundos se transmiten juegos populares y clásicos, principalmente los días lunes y jueves. Los Sábados se transmite el proceso de crear un personaje de ROL y los Domingos se reseñan los animes de temporada.",
  keywords: "Reventando, otros, Mundos, Anime, Juegos, Myullnir",
}

export default async function GamePage() {
  await connectDB()

  const res = await GameModel.find({})

  const games: GameType[] = res.map((doc) => {
    const game = doc.toJSON()
    game.id = game.id.toString()
    return game
  })

  return (
    <section className={styles.background}>
      <header>
        <h1 className={styles.title}>Games</h1>
        <p className={styles.description}>
          Estos son los titulos jugados en el stream de Reventando Otros Mundos
        </p>
      </header>
      <section className={styles.games}>
        <ButtonAddItem type="ADD_GAME" className={styles.button} />
        <Suspense fallback={<GamesLoading />}>
          <ul className={styles.list}>
            {games
              //   @ts-ignore
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map(
                ({
                  name,
                  completed,
                  gameCover,
                  studio,
                  gameYear,
                  steamLink,
                  id,
                  createdAt,
                }) => {
                  return (
                    <li key={id}>
                      <Game
                        name={name}
                        completed={completed}
                        gameCover={gameCover}
                        studio={studio}
                        gameYear={gameYear}
                        steamLink={steamLink}
                        id={id || ""}
                        createdAt={createdAt}
                      />
                    </li>
                  )
                },
              )}
          </ul>
        </Suspense>
      </section>
    </section>
  )
}
