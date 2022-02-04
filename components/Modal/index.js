import styles from "./styles.module.scss"

export default function Modal({ children, onClose }) {
  return (
    <>
      <section className={styles.background}>
        <div className={styles.view}>
          <button
            onClick={() => onClose(false)}
            className={styles.close_button}
          >
            x
          </button>
          {children}
        </div>
      </section>
    </>
  )
}
