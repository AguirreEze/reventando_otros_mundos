"use client"

import { ReactNode, createContext, useState } from "react"
import Modal from "components/Modal"
import GameForm from "components/GameForm"

type ModalTypes = false | "GAMES"

export const ModalContext = createContext<{
  modal: ModalTypes
  setModal: (a: ModalTypes) => void
}>({
  modal: false,
  setModal: (a) => {},
})

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalTypes>(false)

  function modalHandler(str: ModalTypes) {
    switch (str) {
      case "GAMES":
        return (
          <Modal onClose={() => setModal(false)}>
            GAMESTOP
            {/* <GameForm /> */}
          </Modal>
        )
      default:
        return <></>
    }
  }

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {modalHandler(modal)}
      {children}
    </ModalContext.Provider>
  )
}
