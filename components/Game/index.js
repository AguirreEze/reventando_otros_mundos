import Completed from "components/Icons/Completed"
import OnProgress from "components/Icons/OnProgress"
import Steam from "components/Icons/Steam"
import Image from "next/image"
import styles from "./styles.module.scss"

export default function Game({
  name,
  completed,
  gameCover,
  studio,
  gameYear,
  steamLink,
}) {
  return (
    <article className={styles.container}>
      <section className={styles.cover}>
        <Image alt="Game Cover" src={gameCover} height={130} width={170} />
      </section>
      <section className={styles.data}>
        <h2>{name}</h2>
        <p>Studio: {studio}</p>
        <p>Release date: {gameYear}</p>
        <footer className={styles.footer}>
          {completed ? <Completed /> : <OnProgress />}
          {steamLink && (
            <a
              href={steamLink}
              target="_blank"
              rel="noreferrer"
              className={styles.steam}
            >
              <Steam />
            </a>
          )}
        </footer>
      </section>
    </article>
  )
}
