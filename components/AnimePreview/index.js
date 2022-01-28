import Image from "next/image"
import style from "./style.module.scss"

export default function AnimePreview({
  name = "loading...",
  cover = "https://via.placeholder.com/200",
}) {
  return (
    <article className={style.card}>
      <Image
        src="/PlaceHolder.jpg"
        height={200}
        width={200}
        className={style.cover}
        alt={`${name} cover`}
      />
      <h2 className={style.name}>{name}</h2>
    </article>
  )
}
