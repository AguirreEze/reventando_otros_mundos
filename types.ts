export type AnimeType = {
  name: string
  cover: string
  studio: string
  state: "dropeada" | "viendo" | "completo"
  genres: string[]
  year: number
  season: "winter" | "summer" | "autumn" | "spring"
  sinopsis: string
  episodes: number
  createdAt: string
  comentary: string
  score: "-" | number
  watched: number
  id: string
}

export type GameType = {
  name: string
  createdAt: string
  completed: boolean
  gameCover: string
  studio: string
  gameYear: number
  steamLink: string
  id: string
}
