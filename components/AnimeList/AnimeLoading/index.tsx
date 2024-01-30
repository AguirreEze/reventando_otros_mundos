import { SkeletonAnimePreview } from "components/AnimePreview"
import styles from "../styles.module.css"

export default function AnimeLoading() {
  return (
    <ul className={styles.list}>
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
      <SkeletonAnimePreview />
    </ul>
  )
}
