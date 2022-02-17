import styles from "./styles.module.scss"

const SCORE_TEXT = [
  "Test",
  "Esta abominación nunca debió ver la luz del sol",
  "Me indigno con ver esta cosa",
  "Es una pérdida de tiempo y/o decepción",
  "No la recomiendo, le falta para estar buena",
  "La disfruté y no me arrepiento de verla",
  "Está buena",
  "La disfruté y la recomiendo",
  "Está muy buena, la volvería a ver",
  "Háganse un favor y vean esto",
  "Es perfecto, mi vida ahora es la de un ganador",
]

export default function ScoreDescription({ score }) {
  const scoreStampStyles = (score) => {
    if (score < 4) return styles.scoreDescription__red
    if (score < 7) return styles.scoreDescription__yellow
    return styles.scoreDescription__green
  }
  return score === undefined ? (
    <span className={styles.scoreDescription__green}>Sin Score</span>
  ) : (
    <span className={scoreStampStyles(score)}>{SCORE_TEXT[score]}</span>
  )
}
