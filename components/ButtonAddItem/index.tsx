"use client"

import { ModalContext } from "context/ModalProvider"
import { useSession } from "next-auth/react"
import { useContext } from "react"

export default function ButtonAddItem({
  type,
  className,
}: {
  type: "ADD_GAME"
  className: string
}) {
  const session = useSession()
  const { setModal } = useContext(ModalContext)
  if (session.data?.user?.group !== "Admin") return

  return (
    <button
      onClick={() => {
        setModal({ type })
      }}
      className={className}
    >
      + {type} +
    </button>
  )
}
