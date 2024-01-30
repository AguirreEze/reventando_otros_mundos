import { SkeletonAnimePreview } from "components/AnimePreview"
import styles from "../styles.module.css"

export default function AnimeLoading({
  numberOfElements = 12,
}: {
  numberOfElements: number
}) {
  return (
    <ul className={styles.list}>
      {Array.from({ length: numberOfElements }).map((_, i) => (
        <SkeletonAnimePreview key={i} />
      ))}
    </ul>
  )
}
