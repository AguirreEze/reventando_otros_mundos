import Image from "next/image"
import styles from "./styles.module.css"

export default function Avatar({ name, avatar = "/AvatarPlaceholder.jpg" }) {
  return (
    <li className={styles.card}>
      <Image
        src={avatar}
        alt="avatar"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <span className={styles.name}>{name}</span>
    </li>
  )
}
