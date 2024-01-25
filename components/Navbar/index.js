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
      <Link href="/" className={styles.RomIcon}>
          <RomIcon />
      </Link>
      <Link href="/" onClick={() => setShowNav(false)} className={styles.link}>
          home
      </Link>
      <Link href="/games" onClick={() => setShowNav(false)} className={styles.link}>
          games
      </Link>
      <Link href="/radio" onClick={() => setShowNav(false)} className={styles.link}>
          radio
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
