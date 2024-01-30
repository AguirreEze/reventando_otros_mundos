import ScoreStamp from "components/ScoreStamp"
import { AnimeType, AnimeReviewType } from "types"
import EditButton from "components/EditButton"

import styles from "./styles.module.css"

export default function AnimeReview({
  review,
  id,
}: {
  review: AnimeReviewType
  id: AnimeType["id"]
}) {
  const { comentary = "-", score = "-", watched = 0, episodes, state } = review

  const stateStampStyles = (state: AnimeReviewType["state"]) => {
    if (state === "viendo") return styles.stamp_green
    if (state === "dropeada") return styles.stamp_red
    if (state === "completo") return styles.stamp_green
  }
  return (
    <>
      <section className={styles.card}>
        <div className={styles.score}>
          <h2 className={styles.subTitle}>score</h2>
          <ScoreStamp score={score} onlyStamp />
        </div>
        <div className={`${styles.stateStamp} ${stateStampStyles(state)}`}>
          {state}
        </div>
        <div className={styles.watched}>
          <h2 className={styles.subTitle}>vistos</h2>
          <p className={styles.episodes}>
            {watched} / {episodes}
          </p>
        </div>
        <div className={styles.comentary}>
          <h2 className={styles.subTitle}>comentario</h2>
          <p className={styles.description}>{comentary}</p>
        </div>
        <EditButton
          modalValue={{ type: "UPDATE_REVIEW", payload: { ...review, id } }}
        />
      </section>
    </>
  )
}
