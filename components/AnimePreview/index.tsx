import Image from "next/image"
import Link from "next/link"
import ScoreStamp from "components/ScoreStamp"
import IncompleteRibbon from "components/IncompleteRibbon"
import { AnimeType } from "types"
import style from "./style.module.css"

interface Iprops {
  anime: AnimeType
}

export default function AnimePreview({ anime }: Iprops) {
  const { name = "loading...", cover = "/PlaceHolder.jpg", score, id } = anime

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
        <IncompleteRibbon
          state={anime.state}
          comentary={anime.comentary}
          score={score}
        />
        <div className={style.stampContainer}>
          <h2 className={style.name_overlay}>{name}</h2>

          <ScoreStamp score={score} />
        </div>
      </Link>
    </li>
  )
}
