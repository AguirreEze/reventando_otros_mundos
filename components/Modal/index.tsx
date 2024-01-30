import { ReactNode } from "react"
import styles from "./styles.module.css"

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) {
  return (
    <section className={styles.background}>
      <div className={styles.view}>
        <button onClick={onClose} className={styles.close_button}>
          x
        </button>
        {children}
      </div>
    </section>
  )
}
