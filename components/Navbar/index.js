import Game from "components/Icons/Game"
import Radio from "components/Icons/Radio"
import RomIcon from "components/Icons/RomIcon"
import Home from "components/Icons/Home"
import { useSession, signIn, signOut } from "next-auth/react"

import styles from "components/Navbar/navbar.module.scss"
import Link from "next/link"
import SignIn from "components/Icons/SignIn"
import SignOut from "components/Icons/SignOut"

export default function Navbar() {
  const { data: session } = useSession()
  const iconSize = "23px"
  return (
    <header className={styles.header}>
      <RomIcon />
      <nav className={styles.nav}>
        <Link href="/">
          <a>
            <Home width={iconSize} height={iconSize} />
          </a>
        </Link>
        <Link href="/games">
          <a>
            <Game width={iconSize} height={iconSize} />
          </a>
        </Link>
        <Link href="/radio">
          <a>
            <Radio width={iconSize} height={iconSize} />
          </a>
        </Link>
        {session ? (
          <a>
            <SignOut onClick={() => signOut()} />
          </a>
        ) : (
          <a>
            <SignIn onClick={() => signIn()} />
          </a>
        )}
      </nav>
    </header>
  )
}
