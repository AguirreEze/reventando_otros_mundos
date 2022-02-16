import styles from "./styles.module.scss"
export default function ScoreStamp({ score }) {
  const scoreStampStyles = (score) => {
    if (score < 4) return styles.scoreStamp__red
    if (score < 7) return styles.scoreStamp__yellow
    return styles.scoreStamp
  }
  return (
    <div className={scoreStampStyles(score)}>
      <span className={styles.scoreValue}>{score}</span>
    </div>
  )
}
