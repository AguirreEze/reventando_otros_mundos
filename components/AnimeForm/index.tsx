import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import ErrorDisplay from "components/ErrorDisplay"
import Loading from "components/Loading"

import useField from "hooks/useField"
import animeValidation from "models/animeValidation"
import animeGenres from "utils/animeGenres"
import InputAutocomplete from "utils/InputAutocomplete"
import { uploadImage } from "services/images"
import { addAnime, updateAnime, deleteAnime } from "services/anime"

import styles from "./styles.module.css"
import { AnimeType } from "types"

export default function ModalAnime({
  onClose,
  data,
}: {
  data?: AnimeType
  onClose: () => void
}) {
  const router = useRouter()
  const [dragState, setDragState] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [coverPreview, setCoverPreview] = useState(
    data ? data.cover : "/PlaceHolder.jpg",
  )
  const [updatedCover, setUpdatedCover] = useState(false)
  const [state, setState] = useState(data ? data.state : "viendo")
  const [season, setSeason] = useState(data ? data.season : "winter")
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
  const year = useField({
    type: "number",
    initialValue: data ? `${data.year}` : "",
  })
  const episodes = useField({
    type: "number",
    initialValue: data ? `${data.episodes}` : "",
  })
  const genre = useField({ type: "text" })
  const [genres, setGenres] = useState(data ? data.genres : [])
  const [disableSend, setDisableSend] = useState(false)

  const [error, setError] = useState("")

  useEffect(() => {
    if (
      name.input.value &&
      studio.input.value &&
      episodes.input.value &&
      genres.length > 0 &&
      year.input.value &&
      sinopsis.input.value &&
      season &&
      state
    )
      setDisableSend(false)
    else setDisableSend(true)
  }, [
    name.input.value,
    studio.input.value,
    episodes.input.value,
    genres,
    state,
    sinopsis.input.value,
    year.input.value,
    season,
  ])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setUploading(true)
    let dataToSend = {
      name: name.input.value,
      studio: studio.input.value,
      state: state || "viendo",
      sinopsis: sinopsis.input.value,
      genres,
      year: parseInt(year.input.value),
      season,
      cover: coverPreview,
      episodes: parseInt(episodes.input.value) || null,
    }
    try {
      if (coverPreview === "/PlaceHolder.jpg") {
        setError("Cover is required")
        setUploading(false)
        return
      }
      await animeValidation.validate(dataToSend)
    } catch (err: any) {
      setError(err.message)
      setUploading(false)
    }
    try {
      if (updatedCover) {
        const coverURL = await uploadImage(coverPreview)
        dataToSend = { ...dataToSend, cover: coverURL }
      }
      if (data) {
        await updateAnime(dataToSend, data.id)
      } else {
        await addAnime(dataToSend)
      }
      onClose()
      router.refresh()
    } catch ({ response }: any) {
      setError(response.data.error.message || response.data.error)
      setUploading(false)
    }
  }

  const addGenre = (e: FormEvent) => {
    e.preventDefault()
    if (genre.input.value !== "") {
      setGenres([...genres, genre.input.value])
      genre.reset()
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
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    previewImage(file)
    setDragState(false)
    setUpdatedCover(true)
  }

  const previewImage = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCoverPreview(reader.result as string)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleStateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value as AnimeType["state"])
  }
  const handleSeasonSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value as AnimeType["season"])
  }

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()
    if (window.confirm(`Delete ${data?.name}`)) {
      deleteAnime(data?.id)
        .then(() => {
          router.replace("/radio")
        })
        .catch(({ response }) => {
          setError(response.data.error.message || response.data.error)
        })
    }
  }
  const handleRemoveGenre = (e: string) => {
    const filteredList = genres.filter((genre) => genre !== e)
    setGenres(filteredList)
  }

  return (
    <section
      className={dragState ? styles.view_drag : styles.view}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {uploading && <Loading />}
      {dragState ? null : (
        <>
          <button onClick={() => onClose()} className={styles.close}>
            x
          </button>
          <ErrorDisplay text={error} />
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.cover_container}>
              <span>cover:</span>
              <Image
                src={coverPreview}
                className={styles.cover}
                alt={"Anime cover"}
                width={250}
                height={320}
              />
            </div>
            <div className={styles.input_container}>
              <label>game name:</label>
              <input {...name.input} placeholder="Name" name="name" />
            </div>
            <div className={styles.input_container}>
              <label>studio:</label>
              <input {...studio.input} placeholder="Studio" name="studio" />
            </div>
            <div className={styles.input_container}>
              <label>episodes:</label>
              <input
                {...episodes.input}
                placeholder="Episodes"
                name="episodes"
              />
            </div>
            <div
              className={`${styles.input_container} ${styles.genre_container}`}
            >
              <label>genre:</label>
              <input
                {...genre.input}
                placeholder="Genre"
                name="Genre"
                list={"genres"}
              />
              <button onClick={addGenre} className={styles.button}>
                add
              </button>
              <InputAutocomplete id={"genres"} list={animeGenres} />
            </div>
            <div className={styles.genres_container}>
              <span>genres:</span>
              <ul>
                {genres.map((e) => (
                  <li key={e} className={styles.listItem}>
                    {e}
                    <button onClick={() => handleRemoveGenre(e)} type="button">
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.input_container}>
              <label>year:</label>
              <input {...year.input} placeholder="Year" name="Year" />
            </div>
            <div className={styles.input_container__select}>
              <label>season:</label>
              <select
                onChange={handleSeasonSelect}
                defaultValue={data && data.season}
              >
                <option value="winter">Winter</option>
                <option value="autumn">Autumn</option>
                <option value="summer">Summer</option>
                <option value="spring">Spring</option>
              </select>
            </div>

            <div className={styles.input_container__select}>
              <label>state:</label>
              <select
                onChange={handleStateSelect}
                defaultValue={data && data.state}
              >
                <option>viendo</option>
                <option>dropeada</option>
                <option>completo</option>
              </select>
            </div>
            <div className={styles.sinopsis_container}>
              <label>sinopsis:</label>
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
                  className={`${styles.button} ${styles.button_delete}`}
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
  )
}
