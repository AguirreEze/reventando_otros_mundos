import AnimeReview from "components/AnimeReview"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "./styles.module.scss"

const initialData = {
  name: "Pokemon",
  cover: "/PlaceHolder.jpg",
  studio: "GameFreak",
  state: "Dropeada",
  genres: ["action", "aventuras", "comedia", "fantasía", "seinen"],
  year: 1995,
  season: "winter",
  sinopsis:
    "El anime de Pokémon es uno de los pocos que es basado en un videojuego debido a la popularidad de este. La historia del anime esta centrada en un chico de 10 años llamado Ash Ketchum. Este muchacho tiene el sueño de llegar a ser el mejor entrenador Pokémon del mundo. La historia empieza exactamente la noche anterior a que este muchacho empezara su viaje. Este chico vive en Pueblo Paleta con su madre (del padre no se sabe nada). En este pueblo también vive una autoridad del mundo Pokémon, el Profesor Oak, quien le entrega a todos los nuevos entrenadores su primer Pokémon y una herramienta llamada Pokedex (una enciclopedia de alta tecnología con información sobre todos los Pokémon), es esta persona quien le da su primer Pokémon a Ash, como ustedes bien sabrán, un Pikachu.",
  comentary: "Explican todo como si fueramos idiotas",
  watched: 25,
  score: 6.9,
}

export default function Ph({ data = initialData }) {
  return (
    <section>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/radio">
          <a>back</a>
        </Link>
        <h1 className={styles.title}>{data.name}</h1>
      </header>
      <article className={styles.data}>
        <section>
          <Image
            src={data.cover}
            alt={`${data.name} cover`}
            width={250}
            height={320}
          />
        </section>
        <section>
          <h2 className={styles.subTitle}>estudio:</h2>
          <p className={styles.description}>{data.studio}</p>
          <h2 className={styles.subTitle}>generos:</h2>
          <ul className={styles.list}>
            {data.genres.map((e) => (
              <li key={e} className={styles.genre}>
                {e}
              </li>
            ))}
          </ul>
          <h2 className={styles.subTitle}>temporada:</h2>
          <p className={styles.description}>
            {data.season} {data.year}
          </p>
          <h2 className={styles.subTitle}>episodios:</h2>
          <p className={styles.description}>
            {data.episodes ? data.episodes : "?"}
          </p>
        </section>
        <footer className={styles.sinopsis}>
          <h2 className={styles.subTitle}>sinopsis:</h2>
          <p className={styles.description}>{data.sinopsis}</p>
        </footer>
      </article>
      <AnimeReview
        comentary={data.comentary}
        score={data.score}
        watched={data.watched}
        episodes={data.episodes}
        state={data.state}
      />
    </section>
  )
}
