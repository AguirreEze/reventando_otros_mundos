import { Suspense } from "react"
import ButtonAddItem from "components/ButtonAddItem"

import GameList, { SkeletonGameList } from "components/GameList"
import styles from "./styles.module.css"

export const metadata = {
  title: "Reventando Otros Mundos",
  description:
    "En ReventandoOtrosMundos se transmiten juegos populares y clásicos, principalmente los días lunes y jueves. Los Sábados se transmite el proceso de crear un personaje de ROL y los Domingos se reseñan los animes de temporada.",
  keywords: "Reventando, otros, Mundos, Anime, Juegos, Myullnir",
}

export default function GamePage() {
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
        <Suspense fallback={<SkeletonGameList numberOfElements={9} />}>
          <GameList />
        </Suspense>
      </section>
    </section>
  )
}
