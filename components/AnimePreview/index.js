import ScoreDescription from "components/ScoreDescription"
import ScoreStamp from "components/ScoreStamp"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import style from "./style.module.scss"

export default function AnimePreview({ anime, admin }) {
  const router = useRouter()
  const { name = "loading...", cover = "/PlaceHolder.jpg", score, id } = anime
  const reviewIncomplete = () => {
    return (
      anime.state !== "viendo" &&
      admin &&
      (anime.comentary === "-" || typeof score === "undefined")
    )
  }
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/radio/animes/[id]", `/radio/animes/${id}`)
  }

  return (
    <li className={style.card} onClick={handleClick}>
      <div className={style.cover}>
        <Image
          src={cover}
          height={230}
          width={200}
          alt={`${name} cover`}
          layout={"responsive"}
        />
      </div>
      <Link href={`/radio/animes/[id]`} as={`/radio/animes/${id}`}>
        <a className={style.name}>{name}</a>
      </Link>
      {reviewIncomplete() && <div className={style.incomplete_ribbon} />}
      <div className={style.stampContainer}>
        <span className={style.name_overlay}>{name}</span>
        {reviewIncomplete() && (
          <span className={style.review_incomplete}>Review Incompleta</span>
        )}
        <ScoreStamp score={score} />
        <ScoreDescription score={score} />
      </div>
    </li>
  )
}
