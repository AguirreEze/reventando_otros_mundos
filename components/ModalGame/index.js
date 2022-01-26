import styles from "./styles.module.scss"
import Game from "components/Game"
import useField from "hooks/useField"
import { addGame, updateGame } from "services/games"
import { useState } from "react"

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
  const [showCover, setShowCover] = useState(data && data.gameCover)

  if (!show) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToAdd = {
      name: name.input.value,
      gameCover: gameCover.input.value,
      studio: studio.input.value,
      gameYear: gameYear.input.value,
      steamLink: steamLink.input.value,
      completed: false,
    }
    try {
      if (data) {
        const id = data.id
        await updateGame(dataToAdd, id)
      } else {
        await addGame(dataToAdd)
      }
      onClose(false)
    } catch ({ response }) {
      //   setError(response.data.error.message || response.data.error)
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
  return (
    <div className={styles.background}>
      <section className={styles.view}>
        <button onClick={() => onClose(false)} className={styles.close}>
          x
        </button>
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
          <div>
            <button onClick={handleShow} className={styles.button}>
              Show Cover
            </button>
            {data ? (
              <button type="submit" className={styles.button}>
                Update
              </button>
            ) : (
              <button type="submit" className={styles.button}>
                Upload
              </button>
            )}
          </div>
        </form>
        <article>
          <Game
            name={name.input.value}
            gameCover={showCover}
            studio={studio.input.value}
            gameYear={gameYear.input.value}
            steamLink={steamLink.input.value}
            onModal={true}
          ></Game>
        </article>
      </section>
    </div>
  )
}
