import styles from "./styles.module.css"

export default function ErrorDisplay({ text }: { text?: string }) {
  return text === "" ? null : (
    <div className={styles.container}>
      <h1 className={styles.text}>{text}</h1>
    </div>
  )
}
