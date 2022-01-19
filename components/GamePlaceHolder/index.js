import styles from "./styles.module.scss"

export default function GamePlaceHolder() {
  return (
    <article className={styles.container}>
      <section className={styles.cover}>
        <span>?</span>
      </section>
      <section className={styles.data}>
        <span>Loading...</span>
      </section>
    </article>
  )
}
