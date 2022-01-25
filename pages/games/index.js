import Head from "next/head"
import { useEffect, useState } from "react"
import Game from "components/Game"
import styles from "pages/games/styles.module.scss"
import axios from "axios"
import GamePlaceHolder from "components/GamePlaceHolder"
import { useSession } from "next-auth/react"
import Button from "components/Button"
import Link from "next/link"

export default function Games() {
  const { data: session } = useSession()
  const [games, setGames] = useState([])
  useEffect(() => {
    axios.get("/api/games").then((res) => setGames(res.data))
  }, [])
  return (
    <section className={styles.background}>
      <Head>
        <title>Juegos de ROM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className={styles.title}>Games</h1>
        <p className={styles.description}>
          Here is a list of the games played by RoM
        </p>
      </header>
      <section className={styles.games}>
        {session && (
          <Link href="admin/add/game">
            <a>
              <Button>+ Add Game +</Button>
            </a>
          </Link>
        )}
        <ul className={styles.list}>
          {games.length === 0 && <GamePlaceHolder />}
          {games
            .sort((a, b) => b.order - a.order)
            .map(
              ({
                order,
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
                      order={order}
                      name={name}
                      completed={completed}
                      gameCover={gameCover}
                      studio={studio}
                      gameYear={gameYear}
                      steamLink={steamLink}
                      placeHolder={true}
                    />
                  </li>
                )
              }
            )}
        </ul>
      </section>
    </section>
  )
}
