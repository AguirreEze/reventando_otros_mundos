export type AnimeReviewType = {
  state: "dropeada" | "viendo" | "completo"
  score: "-" | number
  comentary: string
  watched: number
  episodes: number
}

export interface AnimeType extends AnimeReviewType {
  name: string
  cover: string
  studio: string
  genres: string[]
  year: number
  season: "winter" | "summer" | "autumn" | "spring"
  sinopsis: string
  createdAt: string
  watched: number
  id: string
}

export type GameType = {
  name: string
  gameCover: string
  studio: string
  gameYear: number
  steamLink: string
  completed: boolean
  createdAt?: string
  id?: string
}
