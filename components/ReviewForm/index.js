import ErrorDisplay from "components/ErrorDisplay"
import { updateAnime } from "services/anime"
import useField from "hooks/useField"
import reviewValidation from "models/reviewValidation"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./styles.module.scss"

export default function ReviewForm({ review, id }) {
  const watched = useField({ type: "number", initialValue: review.watched })
  const comentary = useField({
    type: "textarea",
    initialValue: review.comentary,
  })
  const [state, setState] = useState(review.state)
  const [score, setScore] = useState(review.score)
  const [error, setError] = useState("")
  const [disableSubmit, setDisableSubmit] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisableSubmit(true)
    const dataToSend = {
      score: parseInt(score) || undefined,
      state,
      watched: parseInt(watched.input.value),
      comentary: comentary.input.value,
    }
    reviewValidation
      .validate(dataToSend)
      .then(() => {
        setError("")
        updateAnime(dataToSend, id).then(() => {
          router.reload()
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
          <label name="score" className={styles.label}>
            score
          </label>
          <select
            className={styles.select}
            onChange={(e) => setScore(e.target.value)}
            defaultValue={review.score}
          >
            <option value={null}>-</option>
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
          <label name="watched" className={styles.label}>
            ep. vistos
          </label>
          <input
            {...watched.input}
            name="watched"
            className={styles.input}
            max={999}
            onKeyUp={(e) => {
              if (e.target.value > 999) {
                e.target.value = 999
                watched.input.value = 999
              }
            }}
          />
        </div>
        <div className={styles.form_entry}>
          <label className={styles.label}>state</label>
          <select
            className={styles.select}
            onChange={(e) => setState(e.target.value)}
            defaultValue={review.state}
          >
            <option value="viendo">viendo</option>
            <option value="dropeada">dropeada</option>
            <option value="completo">completo</option>
          </select>
        </div>
        <div className={styles.form_entry_big}>
          <label name="comentary" className={styles.label}>
            comentario
          </label>
          <textarea
            {...comentary.input}
            name="comentary"
            className={styles.textarea}
          />
        </div>
        <div className={styles.form_entry_big}>
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
