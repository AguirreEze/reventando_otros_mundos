import EditIcon from "components/Icons/EditIcon"
import Modal from "components/Modal"
import ReviewForm from "components/ReviewForm"
import { useSession } from "next-auth/react"
import { useState } from "react"
import styles from "./styles.module.scss"

export default function AnimeReview({
  review: { comentary = "-", score = "-", watched = "0", episodes, state },
  id,
}) {
  const [showModal, setShowModal] = useState(false)

  const { data: session } = useSession()

  const scoreStampStyles = (score) => {
    if (score < 4) return styles.scoreStamp__red
    if (score < 7) return styles.scoreStamp__yellow
    return styles.scoreStamp
  }
  const stateStampStyles = (state) => {
    if (state === "viendo") return styles.stateStamp_viendo
    if (state === "dropeada") return styles.stateStamp_dropeada
    if (state === "completo") return styles.stateStamp_completo
  }
  return (
    <>
      <section className={styles.card}>
        <div className={styles.score}>
          <h2 className={styles.subTitle}>score</h2>
          <div className={scoreStampStyles(score)}>
            <span className={styles.scoreValue}>{score}</span>
          </div>
        </div>
        <div className={styles.state}>
          <div className={stateStampStyles(state)}>{state}</div>
          <h2 className={styles.subTitle}>vistos:</h2>
          <p className={styles.episodes}>
            {watched} / {episodes}
          </p>
        </div>
        <div>
          <h2 className={styles.subTitle}>comentario:</h2>
          <p className={styles.description}>{comentary}</p>
        </div>
        {session && session.user.group === "Admin" && (
          <EditIcon
            className={styles.editIcon}
            onClick={() => setShowModal(true)}
          />
        )}
      </section>
      {showModal && (
        <Modal onClose={setShowModal}>
          <ReviewForm review={{ comentary, score, watched, state }} id={id} />
        </Modal>
      )}
    </>
  )
}
