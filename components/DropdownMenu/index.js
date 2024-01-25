import { useSession, signIn, signOut } from "next-auth/react"
import TwitchIcon from "components/Icons/TwitchIcon"
import styles from "./styles.module.scss"
import Link from "next/link"

export default function DropdownMenu({ showNav, setShowNav }) {
  const { data: session } = useSession()
  const handleLogout = () => {
    setShowNav(!showNav)
    signOut({ redirect: false })
  }
  const hanldeLogin = () => {
    signIn("google", { redirect: false })
  }
  return (
    <nav className={showNav ? styles.navMovile__show : styles.navMovile}>
      {session && (
        <p className={styles.user}>
          Welcome<span>{session.user.name}</span>
        </p>
      )}
      <Link href="/" onClick={() => setShowNav(!showNav)} className={styles.link}>
          home
      </Link>
      <Link href="/games" onClick={() => setShowNav(!showNav)} className={styles.link}>
          games
      </Link>
      <Link href="/radio" onClick={() => setShowNav(!showNav)} className={styles.link}>
          radio
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
      <a
        onClick={() => setShowNav(!showNav)}
        href="http://japan-next.blogspot.com/"
        target="_blank"
        rel="noreferrer"
        className={styles.link_japannext}
      >
        JapanNext
      </a>
      <div className={styles.separation}></div>
      {session ? (
        <a onClick={handleLogout} className={styles.link_account}>
          sign out
        </a>
      ) : (
        <a onClick={hanldeLogin} className={styles.link_account}>
          sign in
        </a>
      )}
    </nav>
  )
}
