import { AnimeType } from "types"
import styles from "./styles.module.css"

const SCORE_TEXT = [
  "Es la peor basura que vi en mi vida",
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

export default function ScoreStamp({
  score = "-",
  onlyStamp = false,
}: {
  score: AnimeType["score"]
  onlyStamp?: boolean
}) {
  const scoreStampStyles = (score: AnimeType["score"]) => {
    if (typeof score !== "number" || score > 6) return styles.green
    if (score > 4) return styles.yellow
    return styles.red
  }
  return (
    <>
      <div className={`${styles.scoreStamp} ${scoreStampStyles(score)}`}>
        <span className={styles.scoreValue}>{score}</span>
      </div>
      {!onlyStamp && (
        <span
          className={`${styles.scoreDescription} ${scoreStampStyles(score)}`}
        >
          {score === "-" ? "Sin Score" : SCORE_TEXT[score]}
        </span>
      )}
    </>
  )
}
