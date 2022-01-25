import RomIcon from "components/Icons/RomIcon"
import Hamburger from "components/Icons/Hamburger"

import { useSession, signIn, signOut } from "next-auth/react"
import styles from "components/Navbar/navbar.module.scss"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [showNav, setShowNav] = useState(false)
  const { data: session } = useSession()
  return (
    <header className={styles.header}>
      <RomIcon />

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
          <a onClick={() => setShowNav(!showNav)}>home</a>
        </Link>
        <Link href="/games">
          <a onClick={() => setShowNav(!showNav)}>games</a>
        </Link>
        <Link href="/radio">
          <a onClick={() => setShowNav(!showNav)}>radio</a>
        </Link>
        <div className={styles.separation}></div>
        {session ? (
          <a onClick={() => signOut()}>sign out</a>
        ) : (
          <a onClick={() => signIn()}>sign in</a>
        )}
      </nav>
    </header>
  )
}
