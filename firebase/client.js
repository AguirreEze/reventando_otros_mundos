import { initializeApp } from "firebase/app"
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
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

export const uploadImage = (file) => {
  const storageRef = ref(storage, `images/${file.name}`)
  return uploadBytesResumable(storageRef, file)
}

export const getAllAnimes = () => {
  return getDocs(collection(db, "animes")).then(({ docs }) =>
    docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      return { ...data, id }
    })
  )
}

export const getAnimeByID = (id) => {
  const docRef = doc(db, "animes", id)
  return getDoc(docRef)
}

export const addAnime = ({
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
  return addDoc(collection(db, "animes"), data)
}

export const updateAnime = (data, id) => {
  return updateDoc(doc(db, "animes", id), data)
}

export const deleteAnime = (id) => {
  return deleteDoc(doc(db, "animes", id))
}
