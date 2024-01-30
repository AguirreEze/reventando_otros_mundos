"use client"
import { useEffect, useState } from "react"

import styles from "./styles.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function SkeletonAnimeFilter() {
  return (
    <div className={styles.filter_container}>
      <form className={styles.filter}>
        <label>Name</label>
        <input type="text" value={""} className={styles.input} />
        <label>Year</label>
        <input type="number" value={""} className={styles.input} />
        <label>Season</label>
        <select className={styles.select}>
          <option value={""}>All</option>
          <option value={"winter"}>Winter</option>
          <option value={"spring"}>Spring</option>
          <option value={"summer"}>Summer</option>
          <option value={"autumn"}>Autumn</option>
        </select>
        <label>State</label>
        <select className={styles.select}>
          <option value={""}>All</option>
          <option value={"viendo"}>Viendo</option>
          <option value={"dropeada"}>Dropeada</option>
          <option value={"completo"}>Completo</option>
        </select>
      </form>
    </div>
  )
}

export default function AnimeFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [name, setName] = useState(searchParams?.get("name") || "")
  const [year, setYear] = useState(searchParams?.get("year") || "")
  const [season, setSeason] = useState(searchParams?.get("season") || "")
  const [state, setState] = useState(searchParams?.get("state") || "")

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams({ name, year, season, state })
      const keysForDel: string[] = []
      params.forEach((value, key) => {
        if (value === "") {
          keysForDel.push(key)
        }
      })

      keysForDel.forEach((key) => {
        params.delete(key)
      })
      router.replace(pathname + "?" + params.toString())
    }, 500)

    return () => clearTimeout(timeout)
  }, [name, year, season, state])

  return (
    <div className={styles.filter_container}>
      <form className={styles.filter}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <label>Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={styles.input}
        />
        <label>Season</label>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className={styles.select}
        >
          <option value={""}>All</option>
          <option value={"winter"}>Winter</option>
          <option value={"spring"}>Spring</option>
          <option value={"summer"}>Summer</option>
          <option value={"autumn"}>Autumn</option>
        </select>
        <label>State</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className={styles.select}
        >
          <option value={""}>All</option>
          <option value={"viendo"}>Viendo</option>
          <option value={"dropeada"}>Dropeada</option>
          <option value={"completo"}>Completo</option>
        </select>
      </form>
    </div>
  )
}
