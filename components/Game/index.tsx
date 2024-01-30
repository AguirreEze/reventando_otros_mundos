"use client"

import Completed from "components/Icons/Completed"
import EditIcon from "components/Icons/EditIcon"
import OnProgress from "components/Icons/OnProgress"
import Steam from "components/Icons/Steam"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useContext, useState } from "react"
import styles from "./styles.module.css"
import Link from "next/link"
import { GameType } from "types"
import { ModalContext } from "context/ModalProvider"

interface Iprops extends GameType {
  onModal?: boolean
  setCompleted?: (a: boolean) => void
}

export function SkeletonGame() {
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.loading_bar} />
      </div>
      <div className={styles.data_skeleton}>
        <div className={styles.title_skeleton}>
          <div className={styles.loading_bar} />
        </div>
        <div className={styles.paragraph_skeleton}>
          <div className={styles.loading_bar} />
        </div>
        <div className={styles.paragraph_skeleton}>
          <div className={styles.loading_bar} />
        </div>
      </div>
    </div>
  )
}

export default function Game({
  name,
  completed,
  gameCover = "/PlaceHolder.jpg",
  studio,
  gameYear,
  steamLink,
  id,
  onModal = false,
  setCompleted = () => {},
}: Iprops) {
  const { data: session } = useSession()

  const [showCompleted, setShowCompleted] = useState(completed)
  const { setModal } = useContext(ModalContext)

  const handleClick = () => {
    if (onModal) {
      setCompleted(!completed)
      setShowCompleted(!showCompleted)
    }
  }
  return (
    <article className={styles.container}>
      <section className={styles.cover}>
        <Image alt="Game Cover" src={gameCover} fill />
      </section>
      <section className={styles.data}>
        <h2>{name}</h2>
        <p>Studio: {studio}</p>
        <p>Release date: {gameYear}</p>
        <footer className={styles.footer}>
          <div onClick={handleClick}>
            {showCompleted ? <Completed /> : <OnProgress />}
          </div>
          {steamLink !== "" && (
            <Link
              href={steamLink || "/"}
              target="_blank"
              rel="noreferrer"
              className={styles.steam}
            >
              <Steam />
            </Link>
          )}
        </footer>
        {session && !onModal && session?.user?.group === "Admin" && (
          <EditIcon
            className={styles.editIcon}
            onClick={() => {
              setModal({
                type: "UPDATE_GAME",
                payload: {
                  name,
                  completed,
                  gameCover,
                  studio,
                  gameYear,
                  steamLink,
                  id,
                },
              })
            }}
          />
        )}
      </section>
    </article>
  )
}
