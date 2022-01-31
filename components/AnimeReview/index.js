import styles from "./styles.module.scss"

export default function AnimeReview({
  comentary = "-",
  score = "-",
  watched = "-",
  episodes = "?",
  state,
}) {
  return (
    <article>
      <header className={styles.title}>
        <h1>Review</h1>
      </header>
      <section className={styles.card}>
        <div className={styles.score}>
          <h2 className={styles.subTitle}>score</h2>
          <div className={styles.scoreStamp}>
            <span className={styles.scoreValue}>{score}</span>
          </div>
        </div>
        <div className={styles.state}>
          <div className={styles.stateStamp}>{state}</div>
          <h2 className={styles.subTitle}>vistos:</h2>
          <p className={styles.episodes}>
            {watched} / {episodes}
          </p>
        </div>
        <div>
          <h2 className={styles.subTitle}>comentario:</h2>
          <p className={styles.description}>{comentary}</p>
        </div>
      </section>
    </article>
  )
}
