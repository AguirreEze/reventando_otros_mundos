import { ReactNode } from "react"
import NextAuthProvider from "context/NextAuthProvider"
import Navbar from "components/Navbar"

import styles from "styles/layout.module.css"
import "styles/globals.css"

export const metadata = {
  title: "Reventando Otros Mundos",
  description:
    "En ReventandoOtrosMundos se transmiten juegos populares y clásicos, principalmente los días lunes y jueves. Los Sábados se transmite el proceso de crear un personaje de ROL y los Domingos se reseñan los animes de temporada.",
  keywords: "Reventando, otros, Mundos, Anime, Juegos, Myullnir",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className={styles.background}>
            <main className={styles.view}>
              <Navbar />
              {children}
            </main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
