"use client"

import { ReactNode, createContext, useState } from "react"
import Modal from "components/Modal"
import GameForm from "components/GameForm"
import { GameType } from "types"

type ModalTypes =
  | {
      type: false | "ADD_GAME"
    }
  | {
      type: "UPDATE_GAME"
      payload: GameType
    }

const DEFAULT_VALUE: ModalTypes = { type: false }

export const ModalContext = createContext<{
  modal: ModalTypes
  setModal: (a: ModalTypes) => void
}>({
  modal: DEFAULT_VALUE,
  setModal: (a) => {},
})

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalTypes>(DEFAULT_VALUE)

  function modalHandler(state: ModalTypes) {
    switch (state.type) {
      case "ADD_GAME":
        return (
          <Modal onClose={() => setModal(DEFAULT_VALUE)}>
            <GameForm onClose={() => setModal(DEFAULT_VALUE)} />
          </Modal>
        )
      case "UPDATE_GAME":
        return (
          <Modal onClose={() => setModal(DEFAULT_VALUE)}>
            <GameForm
              data={state.payload}
              onClose={() => setModal(DEFAULT_VALUE)}
            />
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
