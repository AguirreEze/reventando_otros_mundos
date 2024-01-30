"use client"
import { useContext } from "react"
import { useSession } from "next-auth/react"
import { ModalContext, ModalTypes } from "context/ModalProvider"
import EditIcon from "components/Icons/EditIcon"

import styles from "./styles.module.css"

export default function EditButton({ modalValue }: { modalValue: ModalTypes }) {
  const session = useSession()
  const { setModal } = useContext(ModalContext)

  return session.data && session?.data.user.group === "Admin" ? (
    <EditIcon
      className={styles.editIcon}
      onClick={() => setModal(modalValue)}
    />
  ) : (
    <></>
  )
}
