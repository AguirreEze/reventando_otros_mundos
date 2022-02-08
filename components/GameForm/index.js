import styles from "./styles.module.scss"
import Game from "components/Game"
import useField from "hooks/useField"
import { addGame, deleteGame, updateGame } from "services/games"
import { useState } from "react"
import ErrorDisplay from "components/ErrorDisplay"
import { useRouter } from "next/router"
import { uploadImage } from "services/images"

export default function ModalGame({ onClose, data }) {
  const [dragState, setDragState] = useState(false)

  const name = useField({ type: "text", initialValue: data && data.name })

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
  const [gameCover, setGameCover] = useState(
    data ? data.gameCover : "/PlaceHolder.jpg"
  )

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let dataToAdd = {
      name: name.input.value,
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
        const coverURL = await uploadImage(gameCover)
        dataToAdd = { ...dataToAdd, gameCover: coverURL }
        await addGame(dataToAdd)
      }
      router.reload()
    } catch (res) {
      console.log({ res })
      const { response } = res
      setError(response.data.error.message || response.data.error)
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm(`Delete ${data.name}`)) {
      try {
        await deleteGame(data.id)
        router.reload()
      } catch ({ response }) {
        setError(response.data.error.message || response.data.error)
      }
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDragState(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragState(false)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    previewImage(file)
    setDragState(false)
  }
  const previewImage = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setGameCover(reader.result)
    }
  }

  return (
    <section
      className={dragState ? styles.container_drag : styles.container}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {dragState ? null : (
        <>
          <ErrorDisplay text={error} />
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label name="name">game name:</label>
              <input {...name.input} placeholder="Name" name="name" />
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
              <input
                {...steamLink.input}
                placeholder="Link"
                name="Steam link"
              />
            </div>
            <footer className={styles.panel}>
              <button type="submit" className={styles.button}>
                {data ? "Update" : "Upload"}
              </button>
              {data && (
                <button className={styles.button_delete} onClick={handleDelete}>
                  Delete
                </button>
              )}
            </footer>
          </form>
          <article>
            <Game
              name={name.input.value}
              gameCover={gameCover}
              studio={studio.input.value}
              gameYear={gameYear.input.value}
              steamLink={steamLink.input.value}
              completed={completed}
              onModal={true}
              setCompleted={setCompleted}
            ></Game>
          </article>
        </>
      )}
    </section>
  )
}
