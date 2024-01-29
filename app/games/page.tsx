import Game from "components/Game"
import connectDB from "middleware/mongo"
import GameModel from "models/Game"

import styles from "./styles.module.css"
import { GameType } from "types"
import ButtonAddItem from "components/ButtonAddItem"

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
      </section>
    </section>
  )
}
