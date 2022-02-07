import styles from "./styles.module.scss"
import useField from "hooks/useField"
import { useEffect, useState } from "react"
import ErrorDisplay from "components/ErrorDisplay"
import { deleteAnime, updateAnime, uploadImage } from "../../firebase/client"

import { addAnime } from "services/anime"
import { getDownloadURL } from "firebase/storage"
import Loading from "components/Loading"
import animeValidation from "models/AnimeValidation"
import { useRouter } from "next/router"

export default function ModalAnime({ show, onClose, data }) {
  const router = useRouter()
  const [dragState, setDragState] = useState(false)
  const [task, setTask] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [cover, setCover] = useState(data ? data.cover : "/PlaceHolder.jpg")
  const [state, setState] = useState(data ? data.state : null)
  const [season, setSeason] = useState(data ? data.season : null)
  const name = useField({
    type: "text",
    initialValue: data ? data.name : "",
  })
  const studio = useField({
    type: "text",
    initialValue: data ? data.studio : "",
  })
  const sinopsis = useField({
    type: "textarea",
    initialValue: data ? data.sinopsis : "",
  })
  const genre = useField({ type: "text" })
  const [genres, setGenres] = useState(data ? data.genres : [])
  const year = useField({
    type: "number",
    initialValue: data ? data.year : "",
  })
  const episodes = useField({
    type: "number",
    initialValue: data ? data.episodes : "",
  })
  const [disableSend, setDisableSend] = useState(false)

  const [error, setError] = useState("")

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisableSend(true)
    const dataToSend = {
      name: name.input.value,
      cover,
      studio: studio.input.value,
      state: state,
      sinopsis: sinopsis.input.value,
      genres,
      year: parseInt(year.input.value),
      season: season,
      episodes: parseInt(episodes.input.value) || null,
    }
    animeValidation
      .validate(dataToSend)
      .then(() => {
        data
          ? updateAnime(dataToSend, data.id)
              .then(() => {
                onClose(false)
                router.reload()
              })
              .catch((err) => {
                setError(err.message)
                setDisableSend(false)
              })
          : addAnime(dataToSend)
              .then(() => {
                onClose(false)
                router.reload()
              })
              .catch(({ response }) => {
                setError(response.data.error.message || response.data.error)
                setDisableSend(false)
              })
      })
      .catch((err) => {
        setError(err.message)
        setDisableSend(false)
      })
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

  const handleStateSelect = (e) => {
    setState(e.target.value)
  }
  const handleSeasonSelect = (e) => {
    setSeason(e.target.value)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Delete ${data.name}`)) {
      deleteAnime(data.id)
        .then(() => {
          onClose(false)
          router.back()
        })
        .catch((err) => {
          setError(err.message)
        })
    }
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
              <div className={styles.cover_container}>
                <span>cover:</span>
                <img src={cover} className={styles.cover} />
              </div>
              <div className={styles.input_container}>
                <label name="name">game name:</label>
                <input {...name.input} placeholder="Name" name="name" />
              </div>
              <div className={styles.input_container}>
                <label name="studio">studio:</label>
                <input {...studio.input} placeholder="Studio" name="studio" />
              </div>
              <div className={styles.input_container}>
                <label name="episodes">episodes:</label>
                <input
                  {...episodes.input}
                  placeholder="Episodes"
                  name="episodes"
                />
              </div>
              <div className={styles.genre_container}>
                <label name="Genre">genre:</label>
                <input {...genre.input} placeholder="Genre" name="Genre" />
                <button onClick={addGenre} className={styles.button}>
                  add
                </button>
              </div>
              <div className={styles.genres_container}>
                <span>genres:</span>
                <ul>
                  {genres.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.input_container}>
                <label name="Year">year:</label>
                <input {...year.input} placeholder="Year" name="Year" />
              </div>
              <div className={styles.input_container__select}>
                <label name="season">season:</label>
                <select
                  onChange={handleSeasonSelect}
                  defaultValue={data && data.season}
                >
                  <option value={null}></option>
                  <option value="winter">Winter</option>
                  <option value="autum">Autum</option>
                  <option value="summer">Summer</option>
                  <option value="spring">Spring</option>
                </select>
              </div>

              <div className={styles.input_container__select}>
                <label name="State">state:</label>
                <select
                  onChange={handleStateSelect}
                  defaultValue={data && data.state}
                >
                  <option value={null}></option>
                  <option>viendo</option>
                  <option>dropeada</option>
                  <option>completo</option>
                </select>
              </div>
              <div className={styles.sinopsis_container}>
                <label name="Sinopsis">sinopsis:</label>
                <textarea
                  {...sinopsis.input}
                  placeholder="Sinopsis"
                  name="Sinopsis"
                />
              </div>
              <footer className={styles.panel}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={disableSend}
                >
                  {data ? "Update" : "Upload"}
                </button>
                {data && (
                  <button
                    onClick={handleDelete}
                    className={styles.button_delete}
                    disabled={disableSend}
                  >
                    delete
                  </button>
                )}
              </footer>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
