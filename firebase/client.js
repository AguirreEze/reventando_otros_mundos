import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBs-BIxiI7Tkr0NebW1-sJHpcHyr-YpaG8",
  authDomain: "reventandootrosmundos.firebaseapp.com",
  projectId: "reventandootrosmundos",
  storageBucket: "reventandootrosmundos.appspot.com",
  messagingSenderId: "799862422261",
  appId: "1:799862422261:web:942648a482829d00d0a3bc",
  measurementId: "G-JTG10QQVQJ",
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)
const db = getFirestore(app)

export const getAllAnimes = async () => {
  return getDocs(collection(db, "animes")).then(({ docs }) =>
    docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      return { ...data, id }
    })
  )
}

export const addAnime = async ({
  name,
  cover,
  studio,
  state,
  sinopsis,
  genres,
  year,
  season,
  episodes,
}) => {
  if (!name.length) throw new Error("name is required")
  if (!cover.length) throw new Error("cover is required")
  if (!studio.length) throw new Error("studio is required")
  if (!state.length) throw new Error("state is required")
  if (!genres.length) throw new Error("genres is required")
  if (!year.length) throw new Error("year is required")
  if (!season.length) throw new Error("season is required")
  if (!sinopsis.length) throw new Error("sinopsis is required")
  const createdAt = new Date()
  const data = {
    name,
    cover,
    studio,
    state,
    sinopsis,
    genres,
    year,
    season,
    episodes,
    createdAt: createdAt.toISOString(),
  }

  await addDoc(collection(db, "animes"), data)
}

export const uploadImage = (file) => {
  const storageRef = ref(storage, `images/${file.name}`)
  return uploadBytesResumable(storageRef, file)
}
