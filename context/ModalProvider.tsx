"use client"

import { ReactNode, createContext, useState } from "react"
import Modal from "components/Modal"
import GameForm from "components/GameForm"
import AnimeForm from "components/AnimeForm"
import ReviewForm from "components/ReviewForm"
import { AnimeReviewType, AnimeType, GameType } from "types"

interface UpdateReviewPayload extends AnimeReviewType {
  id: string
}

export type ModalTypes =
  | {
      type: false | "ADD_GAME" | "ADD_ANIME"
    }
  | {
      type: "UPDATE_GAME"
      payload: GameType
    }
  | {
      type: "UPDATE_ANIME"
      payload: AnimeType
    }
  | {
      type: "UPDATE_REVIEW"
      payload: UpdateReviewPayload
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
      case "ADD_ANIME":
        return (
          <Modal onClose={() => setModal(DEFAULT_VALUE)}>
            <AnimeForm onClose={() => setModal(DEFAULT_VALUE)} />
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
      case "UPDATE_ANIME":
        return (
          <Modal onClose={() => setModal(DEFAULT_VALUE)}>
            <AnimeForm
              onClose={() => setModal(DEFAULT_VALUE)}
              data={state.payload}
            />
          </Modal>
        )
      case "UPDATE_REVIEW":
        return (
          <Modal onClose={() => setModal(DEFAULT_VALUE)}>
            <ReviewForm
              review={state.payload}
              id={state.payload.id}
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
