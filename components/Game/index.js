import Completed from "components/Icons/Completed"
import EditIcon from "components/Icons/EditIcon"
import OnProgress from "components/Icons/OnProgress"
import Steam from "components/Icons/Steam"
import ModalGame from "components/ModalGame"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import styles from "./styles.module.scss"

export default function Game({
  name,
  completed,
  gameCover = "/PlaceHolder.jpg",
  studio,
  gameYear,
  steamLink,
  id,
  onModal = false,
}) {
  const [showModal, setShowModal] = useState(false)
  const { data: session } = useSession()
  return (
    <>
      <article className={styles.container}>
        <section className={styles.cover}>
          <Image alt="Game Cover" src={gameCover} height={130} width={170} />
        </section>
        <section className={styles.data}>
          <h2>{name}</h2>
          <p>Studio: {studio}</p>
          <p>Release date: {gameYear}</p>
          <footer className={styles.footer}>
            {completed ? <Completed /> : <OnProgress />}
            {steamLink && (
              <a
                href={steamLink}
                target="_blank"
                rel="noreferrer"
                className={styles.steam}
              >
                <Steam />
              </a>
            )}
          </footer>
          {session && !onModal && session.user.group === "Admin" && (
            <EditIcon
              className={styles.editIcon}
              onClick={() => setShowModal(true)}
            >
              edit
            </EditIcon>
          )}
        </section>
      </article>
      <ModalGame
        show={showModal}
        onClose={setShowModal}
        data={{ name, completed, gameCover, studio, gameYear, steamLink, id }}
      />
    </>
  )
}
