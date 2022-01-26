import Head from "next/head"
import Game from "components/Game"
import styles from "pages/games/styles.module.scss"
import { useSession } from "next-auth/react"
import Button from "components/Button"
import Link from "next/link"
import connectDB from "middleware/mongo"
import GameModel from "models/Game"
import useLoading from "hooks/useLoading"
import Loading from "components/Loading"

export default function Games({ games }) {
  const { data: session } = useSession()
  const { loading } = useLoading()

  if (loading) return <Loading />
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
          Estos son los titulos jugados en el stream de Reventando Otros Mundos
        </p>
      </header>
      <section className={styles.games}>
        {session && session.user.group === "Admin" && (
          <Link href="admin/add/game">
            <a>
              <Button>+ Add Game +</Button>
            </a>
          </Link>
        )}
        <ul className={styles.list}>
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
