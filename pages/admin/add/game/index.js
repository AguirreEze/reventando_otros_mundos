import Game from "components/Game"
import useField from "hooks/useField"
import { useState } from "react"

export default function AddGame() {
  const name = useField({ type: "text" })
  const gameCover = useField({ type: "text" })
  const studio = useField({ type: "text" })
  const gameYear = useField({ type: "number" })
  const steamLink = useField({ type: "text" })
  const [showCover, setShowCover] = useState("https://via.placeholder.com/150")

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: name.input.value,
      gameCover: gameCover.input.value,
      studio: studio.input.value,
      gameYear: gameYear.input.value,
      steamLink: steamLink.input.value,
      completed: false,
    }
    console.log(data)
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
    <section>
      <form onSubmit={handleSubmit}>
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
          <button onClick={handleShow}>Show Cover</button>
          <button type="submit">Upload</button>
        </div>
      </form>
      <article>
        <Game
          name={name.input.value}
          gameCover={showCover}
          studio={studio.input.value}
          gameYear={gameYear.input.value}
          steamLink={steamLink.input.value}
        ></Game>
      </article>
    </section>
  )
}
