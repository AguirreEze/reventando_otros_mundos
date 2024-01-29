"use client"

import Completed from "components/Icons/Completed"
import EditIcon from "components/Icons/EditIcon"
import OnProgress from "components/Icons/OnProgress"
import Steam from "components/Icons/Steam"
import Modal from "components/Modal"
import GameForm from "components/GameForm"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import styles from "./styles.module.scss"
import Link from "next/link"
import { GameType } from "types"

interface Iprops extends GameType {
  onModal?: boolean
  setCompleted?: (a: boolean) => void
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
  setCompleted,
}: Iprops) {
  const [showModal, setShowModal] = useState(false)
  const [showCompleted, setShowCompleted] = useState(completed)
  const { data: session } = useSession()

  const handleClick = () => {
    if (onModal) {
      setCompleted(!completed)
      setShowCompleted(!showCompleted)
    }
  }
  return (
    <>
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
                href={steamLink}
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
              onClick={() => setShowModal(true)}
            />
          )}
        </section>
      </article>
      {showModal && (
        <Modal onClose={setShowModal}>
          <GameForm
            show={showModal}
            onClose={setShowModal}
            data={{
              name,
              completed,
              gameCover,
              studio,
              gameYear,
              steamLink,
              id,
            }}
          />
        </Modal>
      )}
    </>
  )
}
