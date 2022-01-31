import styles from "./styles.module.scss"
import useField from "hooks/useField"
import { useEffect, useState } from "react"
import ErrorDisplay from "components/ErrorDisplay"
import { addAnime, uploadImage } from "../../firebase/client"
import { getDownloadURL } from "firebase/storage"
import Loading from "components/Loading"

export default function ModalAnime({ show, onClose }) {
  const [dragState, setDragState] = useState(false)
  const [task, setTask] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [cover, setCover] = useState("/PlaceHolder.jpg")

  const name = useField({ type: "text" })
  const studio = useField({ type: "text" })
  const state = useField({ type: "text" })
  const sinopsis = useField({ type: "textarea" })
  const genre = useField({ type: "text" })
  const year = useField({ type: "number" })
  const season = useField({ type: "text" })
  const episodes = useField({ type: "number" })
  const [error, setError] = useState("")
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const onProgress = () => {
      setUploading(true)
    }
    const onError = (error) => {
      setUploading(false)
      setDragState(false)
      setError(error.code)
    }
    const onComplete = () => {
      setUploading(false)
      setDragState(false)
      getDownloadURL(task.snapshot.ref).then(setCover)
    }
    if (task) {
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  if (!show) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addAnime({
        name: name.input.value,
        cover,
        studio: studio.input.value,
        state: state.input.value,
        sinopsis: sinopsis.input.value,
        genres,
        year: year.input.value,
        season: season.input.value,
        episodes: episodes.input.value || "?",
      })
      onClose(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const addGenre = (e) => {
    e.preventDefault()
    if (genre.input.value !== "") {
      setGenres([...genres, genre.input.value])
      genre.reset()
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

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.background}>
      <section
        className={dragState ? styles.view_drag : styles.view}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {dragState ? (
          uploading && <Loading />
        ) : (
          <>
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
                <span>cover:</span>
                <img src={cover} className={styles.cover} />
              </div>
              <div>
                <label name="studio">studio:</label>
                <input {...studio.input} placeholder="Name" name="studio" />
              </div>
              <div>
                <label name="State">state:</label>
                <input {...state.input} placeholder="State" name="State" />
              </div>
              <div>
                <label name="Genre">genre:</label>
                <input {...genre.input} placeholder="Genre" name="Genre" />
                <button onClick={addGenre} className={styles.button}>
                  add genre
                </button>
              </div>
              <div>
                <span>Genres</span>
                <ul>
                  {genres.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>

              <div>
                <label name="Year">year:</label>
                <input {...year.input} placeholder="Year" name="Year" />
              </div>
              <div>
                <label name="season">season:</label>
                <input {...season.input} placeholder="Season" name="season" />
              </div>
              <div>
                <label name="episodes">episodes:</label>
                <input
                  {...episodes.input}
                  placeholder="Episodes"
                  name="episodes"
                />
              </div>
              <div>
                <label name="Sinopsis">sinopsis:</label>
                <textarea
                  {...sinopsis.input}
                  placeholder="Sinopsis"
                  name="Sinopsis"
                  className={styles.textarea}
                />
              </div>
              <footer className={styles.panel}>
                <button type="submit" className={styles.button}>
                  Upload
                </button>
              </footer>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
