"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import ErrorDisplay from "components/ErrorDisplay"
import reviewValidation from "models/reviewValidation"
import { updateAnime } from "services/anime"
import useField from "hooks/useField"
import { AnimeReviewType } from "types"

import styles from "./styles.module.css"

interface Iprops {
  review: AnimeReviewType
  id: string
  onClose: () => void
}

export default function ReviewForm({ review, id, onClose }: Iprops) {
  const watched = useField({
    type: "number",
    initialValue: `${review.watched}`,
  })
  const comentary = useField({
    type: "textarea",
    initialValue: review.comentary,
  })
  const [state, setState] = useState(review.state)
  const [score, setScore] = useState(review.score)
  const [error, setError] = useState("")
  const [disableSubmit, setDisableSubmit] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDisableSubmit(true)
    const dataToSend = {
      score: score === "-" ? undefined : score,
      state,
      watched: parseInt(watched.input.value),
      comentary: comentary.input.value,
    }
    reviewValidation
      .validate(dataToSend)
      .then(() => {
        setError("")
        updateAnime(dataToSend, id).then(() => {
          onClose()
          router.refresh()
        })
      })
      .catch((err) => {
        setDisableSubmit(false)
        setError(err.message)
      })
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Review</h2>
      <ErrorDisplay text={error} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_entry}>
          <label className={styles.label}>score</label>
          <select
            className={styles.select}
            onChange={(e) =>
              setScore(e.target.value as AnimeReviewType["score"])
            }
            defaultValue={review.score}
          >
            <option value={""}>-</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className={styles.form_entry}>
          <label className={styles.label}>ep. vistos</label>
          <input
            {...watched.input}
            name="watched"
            className={styles.input}
            max={999}
          />
        </div>
        <div className={styles.form_entry}>
          <label className={styles.label}>state</label>
          <select
            className={styles.select}
            onChange={(e) =>
              setState(e.target.value as AnimeReviewType["state"])
            }
            defaultValue={review.state}
          >
            <option value="viendo">viendo</option>
            <option value="dropeada">dropeada</option>
            <option value="completo">completo</option>
          </select>
        </div>
        <div className={`${styles.form_entry} ${styles.form_entry_big}`}>
          <label className={styles.label}>comentario</label>
          <textarea
            {...comentary.input}
            name="comentary"
            className={styles.textarea}
          />
        </div>
        <div className={`${styles.form_entry} ${styles.form_entry_big}`}>
          <button
            type="submit"
            className={styles.button}
            disabled={disableSubmit}
          >
            update
          </button>
        </div>
      </form>
    </section>
  )
}
