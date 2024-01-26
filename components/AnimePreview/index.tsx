import ScoreStamp from "components/ScoreStamp"
import Image from "next/image"
import Link from "next/link"
import style from "./style.module.scss"
import { AnimeType } from "types"

interface Iprops {
  anime: AnimeType
  admin: boolean
}

export default function AnimePreview({ anime, admin }: Iprops) {
  const { name = "loading...", cover = "/PlaceHolder.jpg", score, id } = anime
  const reviewIncomplete = () => {
    return (
      anime.state !== "viendo" &&
      admin &&
      (anime.comentary === "-" || typeof score === "undefined")
    )
  }

  return (
    <li className={style.card}>
      <Link
        href={`/radio/animes/[id]`}
        as={`/radio/animes/${id}`}
        className={style.anchor}
      >
        <div className={style.cover}>
          <Image src={cover} alt={`${name} cover`} fill />
        </div>
        <h2 className={style.name}>{name}</h2>
        {reviewIncomplete() && <div className={style.incomplete_ribbon} />}
        <div className={style.stampContainer}>
          <h2 className={style.name_overlay}>{name}</h2>
          {reviewIncomplete() && (
            <span className={style.review_incomplete}>Review Incompleta</span>
          )}
          <ScoreStamp score={score} />
        </div>
      </Link>
    </li>
  )
}
