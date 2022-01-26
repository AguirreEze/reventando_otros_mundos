import styles from "./styles.module.scss"
import Game from "components/Game"
import useField from "hooks/useField"
import { addGame, deleteGame, updateGame } from "services/games"
import { useState } from "react"
import ErrorDisplay from "components/ErrorDisplay"
import { useRouter } from "next/router"

export default function ModalGame({ show, onClose, data }) {
  const name = useField({ type: "text", initialValue: data && data.name })
  const gameCover = useField({
    type: "text",
    initialValue: data && data.gameCover,
  })
  const studio = useField({ type: "text", initialValue: data && data.studio })
  const gameYear = useField({
    type: "number",
    initialValue: data && data.gameYear,
  })
  const steamLink = useField({
    type: "text",
    initialValue: data && data.steamLink,
  })
  const [completed, setCompleted] = useState(data ? data.completed : false)
  const [error, setError] = useState("")
  const [showCover, setShowCover] = useState(data && data.gameCover)
  const router = useRouter()

  if (!show) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToAdd = {
      name: name.input.value,
      gameCover: gameCover.input.value,
      studio: studio.input.value,
      gameYear: gameYear.input.value,
      steamLink: steamLink.input.value,
      completed: completed,
    }
    try {
      if (data) {
        const id = data.id
        await updateGame(dataToAdd, id)
      } else {
        await addGame(dataToAdd)
      }
      onClose(false)
      router.reload()
    } catch ({ response }) {
      setError(response.data.error.message || response.data.error)
    }
  }

  const handleShow = (e) => {
    e.preventDefault()
    if (
      gameCover.input.value.startsWith("http://") ||
      gameCover.input.value.startsWith("https://")
    ) {
      setShowCover(gameCover.input.value)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm(`Delete ${data.name}`)) {
      try {
        await deleteGame(data.id)
        onClose(false)
        router.reload()
      } catch ({ response }) {
        setError(response.data.error.message || response.data.error)
      }
    }
  }
  return (
    <div className={styles.background}>
      <section className={styles.view}>
        <button onClick={() => onClose(false)} className={styles.close}>
          x
        </button>
        <ErrorDisplay text={error} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label name="name">game name:</label>
            <input {...name.input} placeholder="Name" name="name" />
          </div>
          <div>
            <label>game cover:</label>
            <input
              {...gameCover.input}
              placeholder="Game Cover Link"
              name="gameCover"
            />
          </div>
          <div>
            <label name="studio">studio:</label>
            <input {...studio.input} placeholder="Name" name="studio" />
          </div>
          <div>
            <label name="Game year">game year:</label>
            <input {...gameYear.input} placeholder="Year" name="Game year" />
          </div>
          <div>
            <label name="Steam link">steam link:</label>
            <input {...steamLink.input} placeholder="Link" name="Steam link" />
          </div>
          <footer className={styles.panel}>
            <button onClick={handleShow} className={styles.button}>
              Show Cover
            </button>
            {data ? (
              <>
                <button type="submit" className={styles.button}>
                  Update
                </button>
                <button className={styles.button_delete} onClick={handleDelete}>
                  Delete
                </button>
              </>
            ) : (
              <button type="submit" className={styles.button}>
                Upload
              </button>
            )}
          </footer>
        </form>
        <article>
          <Game
            name={name.input.value}
            gameCover={showCover}
            studio={studio.input.value}
            gameYear={gameYear.input.value}
            steamLink={steamLink.input.value}
            completed={completed}
            onModal={true}
            setCompleted={setCompleted}
          ></Game>
        </article>
      </section>
    </div>
  )
}
