import styles from "./styles.module.css"
import Game from "components/Game"
import useField from "hooks/useField"
import { addGame, deleteGame, updateGame } from "services/games"
import { DragEvent, FormEvent, useState } from "react"
import ErrorDisplay from "components/ErrorDisplay"
import { uploadImage } from "services/images"
import gameValidation from "models/gameValidation"
import Loading from "components/Icons/Loading"
import { GameType } from "types"

export default function ModalGame({
  data,
  onClose,
}: {
  data?: GameType
  onClose: () => void
}) {
  const [dragState, setDragState] = useState(false)
  const [loading, setLoading] = useState(false)
  const name = useField({ type: "text", initialValue: data && data.name })

  const studio = useField({ type: "text", initialValue: data && data.studio })
  const gameYear = useField({
    type: "number",
    initialValue: data && `${data.gameYear}`,
  })
  const steamLink = useField({
    type: "text",
    initialValue: data && data.steamLink,
  })
  const [completed, setCompleted] = useState(data ? data.completed : false)
  const [error, setError] = useState("")
  const [gameCover, setGameCover] = useState(
    data ? data.gameCover : "/PlaceHolder.jpg",
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    let dataToAdd = {
      name: name.input.value,
      studio: studio.input.value,
      gameYear: gameYear.input.value,
      steamLink: steamLink.input.value,
      gameCover,
      completed,
    }
    try {
      await gameValidation.validate(dataToAdd)
      if (gameCover === "/PlaceHolder.jpg") {
        setError("Cover is required")
        return
      }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
      return
    }
    try {
      if (data) {
        const id = data.id
        await updateGame(dataToAdd, id)
      } else {
        const coverURL = await uploadImage(gameCover)
        dataToAdd = { ...dataToAdd, gameCover: coverURL as string }
        await addGame(dataToAdd)
      }
      setLoading(false)
      onClose()
      console.log("RELOAD") //  TO_DO
    } catch (res: any) {
      const { response } = res
      setError(response?.data?.error?.message || response?.data?.error)
      setLoading(false)
    }
  }
  const handleDelete = async () => {
    if (window.confirm(`Delete ${data?.name}`)) {
      try {
        await deleteGame(data?.id)
        setLoading(false)
        onClose()
        console.log("RELOAD") //  TO_DO
      } catch ({ response }: any) {
        setError(response?.data?.error?.message || response?.data?.error)
      }
    }
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragState(true)
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragState(false)
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer?.files[0]
    file && previewImage(file)
    setDragState(false)
  }
  const previewImage = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setGameCover(reader.result as string)
    }
  }

  return (
    <section
      className={`${styles.container} ${dragState && styles.container_drag}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {loading && <Loading />}
      {dragState ? null : (
        <>
          <ErrorDisplay text={error} />
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label>game name:</label>
              <input {...name.input} placeholder="Name" name="name" />
            </div>

            <div>
              <label>studio:</label>
              <input {...studio.input} placeholder="Name" name="studio" />
            </div>
            <div>
              <label>game year:</label>
              <input {...gameYear.input} placeholder="Year" name="Game year" />
            </div>
            <div>
              <label>steam link:</label>
              <input
                {...steamLink.input}
                placeholder="Link"
                name="Steam link"
              />
            </div>
            <footer className={styles.panel}>
              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {data ? "Update" : "Upload"}
              </button>
              {data && (
                <button
                  className={`${styles.button} ${styles.button_delete}`}
                  onClick={handleDelete}
                  disabled={loading}
                >
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
              gameYear={parseInt(gameYear.input.value)}
              steamLink={steamLink.input.value}
              completed={completed}
              onModal={true}
              setCompleted={setCompleted}
            />
          </article>
        </>
      )}
    </section>
  )
}
