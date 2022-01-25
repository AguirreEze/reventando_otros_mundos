import styles from "./styles.module.scss"
export default function Button({ children, onClick }) {
  return <button className={styles.button}>{children}</button>
}
