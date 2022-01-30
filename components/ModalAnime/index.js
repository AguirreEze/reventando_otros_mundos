import styles from "./styles.module.scss"
import useField from "hooks/useField"
import { useState } from "react"
import ErrorDisplay from "components/ErrorDisplay"

export default function ModalAnime({ show, onClose }) {
  const name = useField({ type: "text" })
  const cover = useField({ type: "text" })
  const studio = useField({ type: "text" })
  const state = useField({ type: "text" })
  const sinopsis = useField({ type: "textarea" })
  const genre = useField({ type: "text" })
  const year = useField({ type: "number" })
  const [error, setError] = useState("")
  const [showCover, setShowCover] = useState()
  const [genres, setGenres] = useState([])

  if (!show) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(showCover)
    setError(10)
    console.log(genres)
  }

  const handleShow = (e) => {
    e.preventDefault()
    if (
      cover.input.value.startsWith("http://") ||
      cover.input.value.startsWith("https://")
    ) {
      setShowCover(cover.input.value)
    }
  }
  const addGenre = (e) => {
    e.preventDefault()
    if (genre.input.value !== "") {
      setGenres([...genres, genre.input.value])
      genre.reset()
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
            <label>cover:</label>
            <input {...cover.input} placeholder="Cover Link" name="cover" />
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
            <label name="Sinopsis">sinopsis:</label>
            <textarea
              {...sinopsis.input}
              placeholder="Sinopsis"
              name="Sinopsis"
              className={styles.textarea}
            />
          </div>
          <footer className={styles.panel}>
            <button onClick={handleShow} className={styles.button}>
              Show Cover
            </button>
            <button type="submit" className={styles.button}>
              Upload
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}
