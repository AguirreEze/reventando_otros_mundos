import RomIcon from "components/Icons/RomIcon"
import Hamburger from "components/Icons/Hamburger"

import styles from "./navbar.module.scss"
import Link from "next/link"
import { useState } from "react"
import DropdownMenu from "components/DropdownMenu"

export default function Navbar() {
  const [showNav, setShowNav] = useState(false)

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.RomIcon}>
          <RomIcon />
        </a>
      </Link>
      <Link href="/">
        <a onClick={() => setShowNav(false)} className={styles.link}>
          home
        </a>
      </Link>
      <Link href="/games">
        <a onClick={() => setShowNav(false)} className={styles.link}>
          games
        </a>
      </Link>
      <Link href="/radio">
        <a onClick={() => setShowNav(false)} className={styles.link}>
          radio
        </a>
      </Link>
      <button onClick={() => setShowNav(!showNav)} className={styles.link}>
        Links
      </button>
      <Hamburger
        onClick={() => setShowNav(!showNav)}
        className={styles.hamburger}
      />

      <DropdownMenu showNav={showNav} setShowNav={setShowNav} />
    </header>
  )
}
