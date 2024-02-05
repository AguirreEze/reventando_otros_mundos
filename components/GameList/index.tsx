import Game, { SkeletonGame } from "components/Game"

import connectDB from "middleware/mongo"
import GameModel from "models/Game"

import { GameType } from "types"

import styles from "./styles.module.css"

export const revalidate = 0

export function SkeletonGameList({
  numberOfElements = 5,
}: {
  numberOfElements: number
}) {
  return (
    <ul className={styles.list}>
      {Array.from({ length: numberOfElements }).map((_, i) => {
        return (
          <li key={i}>
            <SkeletonGame />
          </li>
        )
      })}
    </ul>
  )
}

export default async function GameList() {
  await connectDB()
  const res = await GameModel.find({})

  const games: GameType[] = res.map((doc) => {
    const game = doc.toJSON()
    game.id = game.id.toString()
    return game
  })
  return (
    <ul className={styles.list}>
      {games
        // @ts-ignore
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
  )
}
