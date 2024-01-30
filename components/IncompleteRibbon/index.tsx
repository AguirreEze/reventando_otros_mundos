"use client"
import { AnimeType } from "types"
import style from "./styles.module.css"
import { useSession } from "next-auth/react"

export default function IncompleteRibbon({
  state,
  comentary,
  score,
}: {
  state: AnimeType["state"]
  comentary: AnimeType["comentary"]
  score: AnimeType["score"]
}) {
  const session = useSession()

  const reviewIncomplete = () => {
    return (
      state !== "viendo" &&
      session.data?.user.group === "Admin" &&
      (comentary === "-" || typeof score === "undefined")
    )
  }
  return reviewIncomplete() ? (
    <div className={style.incomplete_ribbon} />
  ) : (
    <></>
  )
}
