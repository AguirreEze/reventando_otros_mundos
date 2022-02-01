import Image from "next/image"
import Link from "next/link"
import style from "./style.module.scss"

export default function AnimePreview({
  name = "loading...",
  cover = "/PlaceHolder.jpg",
  id,
}) {
  return (
    <Link href={`/radio/animes/[id]`} as={`/radio/animes/${id}`}>
      <a>
        <article className={style.card}>
          <Image
            src={cover}
            height={230}
            width={200}
            className={style.cover}
            alt={`${name} cover`}
          />
          <h2 className={style.name}>{name}</h2>
        </article>
      </a>
    </Link>
  )
}
