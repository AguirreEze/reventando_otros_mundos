import Avatar from "components/Avatar"

import styles from "./styles.module.css"

const CARDS = [
  {
    title: "¿Quiénes somos?",
    description:
      "Somos un grupo de amigos que decidimos hacer un canal para mostrar juegos que nos gustan, charlar de animes geniales y horribles por igual y jugar partidas de rol. En total somos como siete, pero usualmente nos conectamos tres o cuatro. Somos parte de un grupo conocido por pocos como los caballeros de la pera. Siempre estamos dispuestos y con ganas de hablar con la gente. Tenemos un humor un poco ácido, pero intentamos no reírnos a costa de nadie que no sea nosotros.",
  },
  {
    title: "Los Caballeros",
    list: [
      { name: "Myullnir", avatar: "/avatars/Myullnir.webp" },
      { name: "Sr. R", avatar: "/avatars/SrR.webp" },
      { name: "Tydrok", avatar: "/avatars/Tydrok.webp" },
      { name: "MrLolycon", avatar: "/avatars/MrLolycon.webp" },
      { name: "Kaiser", avatar: "/avatars/Kaiser.webp" },
      { name: "Nitricx", avatar: "/avatars/Nitrix.webp" },
      { name: "Sabak", avatar: "/avatars/Sabak.webp" },
      { name: "Nax", avatar: "/avatars/Nax.webp" },
    ],
  },
  {
    title: "¿Qué juegos transmitimos?",
    description:
      "Principalmente quien transmite es Myullnir. Su computadora es medio viejita, así que jugamos lo que la pc se banca. Así que cosas del 2010 para acá definitivamente no. Y creo que estoy siendo generoso con el 2010. Pueden revisar la lista de juegos jugados para ver qué juegos ya nos pasamos.",
  },
  {
    title: "¿De qué animes hablan?",
    description:
      "Cada temporada tomamos varios animes y los vamos viendo a medida que salen y reseñamos de alguna manera lo que ocurre cada capítulo. Si bien siempre estamos para charlar de animes, principalmente esto lo hacemos los domingos a las 22:00 hora Argentina.",
  },
  {
    title: "¿Qué sistema de rol usan?",
    description:
      "Jugamos Pathfinder 2e. A Myullnir le encanta el sistema y como eterno GM que es, jugamos cuando puede armar una partida. Los sábados que no jugamos partidas, nos ponemos a armar personajes o crear objetos mágicos o charlar sobre consejos para partidas. No duden en pasar y preguntar cosas si tienen algún problema en su mesa y quieren una segunda opinión sobre cómo resolverlo.",
  },
  {
    title: "¿Por qué Reventando Otros Mundos?",
    description:
      "Porque originalmente este proyecto surgió como un canal exclusivamente de rol que armamos con otro grupo de amigos y el nombre era sobre reventar otros mundos de ficción que fueramos creando, con la idea de cambiar periódicamente de temáticas de juegos de rol.",
  },
]

export const metadata = {
  title: "Reventando Otros Mundos",
  description:
    "En ReventandoOtrosMundos se transmiten juegos populares y clásicos, principalmente los días lunes y jueves. Los Sábados se transmite el proceso de crear un personaje de ROL y los Domingos se reseñan los animes de temporada.",
  keywords: "Reventando, otros, Mundos, Anime, Juegos, Myullnir",
}

export default function HomePage() {
  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Reventando Otros Mundos</h1>
      <section className={styles.content}>
        {CARDS.map((card) => {
          return card.list ? (
            <div className={styles.card} key={card.title}>
              <h2 className={styles.h2}>{card.title}</h2>
              <ul className={styles.description_list}>
                {card.list.map((c, index) => {
                  return <Avatar key={index} name={c.name} avatar={c.avatar} />
                })}
              </ul>
            </div>
          ) : (
            <div className={styles.card} key={card.title}>
              <h2 className={styles.h2}>{card.title}</h2>
              <p className={styles.description}>{card.description}</p>
            </div>
          )
        })}
      </section>
    </article>
  )
}
