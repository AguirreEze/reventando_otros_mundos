import { initializeApp } from "firebase/app"
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

export const uploadImage = (file) => {
  const storageRef = ref(storage, `images/${file.name}`)
  return uploadBytesResumable(storageRef, file)
}
