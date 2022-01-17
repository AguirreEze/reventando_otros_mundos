import Game from "components/Icons/Game"
import Radio from "components/Icons/Radio"
import RomIcon from "components/Icons/RomIcon"
import Home from "components/Icons/Home"

import styles from "components/Navbar/navbar.module.scss"
import Link from "next/link"

export default function Navbar() {
  const iconSize = "30px"
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
      </nav>
    </header>
  )
}
