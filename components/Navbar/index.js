import RomIcon from "components/Icons/RomIcon"
import Hamburger from "components/Icons/Hamburger"

import { useSession, signIn, signOut } from "next-auth/react"
import styles from "components/Navbar/navbar.module.scss"
import Link from "next/link"
import { useState } from "react"
import TwitchIcon from "components/Icons/TwitchIcon"

export default function Navbar() {
  const [showNav, setShowNav] = useState(false)
  const { data: session } = useSession()
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <RomIcon />
        </a>
      </Link>

      <Hamburger
        onClick={() => setShowNav(!showNav)}
        className={styles.hamburger}
      />
      <nav className={showNav ? styles.navMovile__show : styles.navMovile}>
        {session && (
          <p className={styles.user}>
            Welcome<span>{session.user.name}</span>
          </p>
        )}
        <Link href="/">
          <a onClick={() => setShowNav(!showNav)} className={styles.link}>
            home
          </a>
        </Link>
        <Link href="/games">
          <a onClick={() => setShowNav(!showNav)} className={styles.link}>
            games
          </a>
        </Link>
        <Link href="/radio">
          <a onClick={() => setShowNav(!showNav)} className={styles.link}>
            radio
          </a>
        </Link>

        <a
          onClick={() => setShowNav(!showNav)}
          href="https://www.twitch.tv/reventando_otros_mundos"
          target="_blank"
          rel="noreferrer"
          className={styles.twitch}
        >
          Twitch <TwitchIcon className={styles.twitch_icon} />
        </a>
        <div className={styles.separation}></div>
        {session ? (
          <a onClick={() => signOut()} className={styles.link}>
            sign out
          </a>
        ) : (
          <a onClick={() => signIn()} className={styles.link}>
            sign in
          </a>
        )}
      </nav>
    </header>
  )
}
