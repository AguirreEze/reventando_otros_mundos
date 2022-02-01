import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import style from "./style.module.scss"

export default function AnimePreview({
  name = "loading...",
  cover = "/PlaceHolder.jpg",
  id,
}) {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/radio/animes/[id]", `/radio/animes/${id}`)
  }
  return (
    <article className={style.card} onClick={handleClick}>
      <Image
        src={cover}
        height={230}
        width={200}
        className={style.cover}
        alt={`${name} cover`}
      />
      <Link href={`/radio/animes/[id]`} as={`/radio/animes/${id}`}>
        <a>
          <h2 className={style.name}>{name}</h2>
        </a>
      </Link>
    </article>
  )
}
