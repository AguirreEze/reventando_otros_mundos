import Game from "models/Game"
import connectDB from "middleware/mongo"
import errorHandler from "middleware/errorHandler"

// const games = [
//   {
//     name: "Hunie Cam Studio",
//     completed: true,
//     order: 1,
//     gameCover: "https://i.postimg.cc/4N2tfPjL/Huniecam-Studio.jpg",
//     studio: "HuniePot",
//     gameYear: 2016,
//     steamLink: "https://store.steampowered.com/app/426000/HunieCam_Studio/",
//   },
//   {
//     name: "Slay The Spire",
//     completed: true,
//     order: 2,
//     gameCover: "https://i.postimg.cc/Kz7Bm2yB/Slay-The-Spire.jpg",
//     studio: "Mega Crit Games",
//     gameYear: 2019,
//     steamLink: "https://store.steampowered.com/app/646570/Slay_the_Spire/",
//   },
//   {
//     name: "Dark Fear",
//     completed: true,
//     order: 3,
//     gameCover: "https://i.postimg.cc/dt5R7wZ9/Dark-Fear.jpg",
//     studio: "Arif Games",
//     gameYear: 2016,
//     steamLink: "https://store.steampowered.com/app/454160/Dark_Fear/",
//   },
//   {
//     name: "Kirby's Adventure in Dreamland Advance",
//     completed: true,
//     order: 4,
//     gameCover:
//       "https://i.postimg.cc/jdxQdL25/Kirby-s-Adventure-in-Dreamland-Advance.png",
//     studio: "HAL Laboratory",
//     gameYear: 1992,
//   },
//   {
//     name: "S.C.A.R.S.",
//     completed: true,
//     order: 5,
//     gameCover: "https://i.postimg.cc/QCsg7Mqf/SCARS.jpg",
//     studio: "Savage Studios",
//     gameYear: 2020,
//     steamLink: "https://store.steampowered.com/app/1050720/SCAR/",
//   },
//   {
//     name: "Grimm's Hollow",
//     completed: true,
//     order: 6,
//     gameCover: "https://i.postimg.cc/VLggjXpn/Grimm-s-Hollow.jpg",
//     studio: "ghosthunter",
//     gameYear: 2019,
//     steamLink: "https://store.steampowered.com/app/1170880/Grimms_Hollow/",
//   },
//   {
//     name: "Helltaker",
//     completed: true,
//     order: 7,
//     gameCover: "https://i.postimg.cc/9frLXzxT/Helltaker.jpg",
//     studio: "vanripper",
//     gameYear: 2020,
//     steamLink: "https://store.steampowered.com/app/1289310/Helltaker/",
//   },
//   {
//     name: "Sonic The Hedgehog",
//     completed: true,
//     order: 8,
//     gameCover: "https://i.postimg.cc/nLc64H3c/Sonic-The-Hedgehog.jpg",
//     studio: "SEGA",
//     gameYear: 1991,
//     steamLink: "https://store.steampowered.com/app/71113/Sonic_The_Hedgehog/",
//   },
//   {
//     name: "Final Fantasy V",
//     completed: true,
//     order: 9,
//     gameCover: "https://i.postimg.cc/VLXQ1ZS1/Final-Fantasy-V.jpg",
//     studio: "Square Enix",
//     gameYear: 1992,
//     steamLink: "https://store.steampowered.com/app/1173810/FINAL_FANTASY_V/",
//   },
//   {
//     name: "Prince of Persia: Sands of Time",
//     completed: true,
//     order: 10,
//     gameCover:
//       "https://i.postimg.cc/QtC0tC01/Prince-of-Persia-Sands-of-Time.jpg",
//     studio: "Ubisoft",
//     gameYear: 2003,
//     steamLink:
//       "https://store.steampowered.com/app/13600/Prince_of_Persia_The_Sands_of_Time/",
//   },
//   {
//     name: "Prince of Persia: The Warrior Within",
//     completed: true,
//     order: 11,
//     gameCover:
//       "https://i.postimg.cc/TPCtfgqT/Prince-of-Persia-The-Warrior-Within.jpg",
//     studio: "Ubisoft",
//     gameYear: 2004,
//     steamLink:
//       "https://store.steampowered.com/app/13500/Prince_of_Persia_Warrior_Within/",
//   },
//   {
//     name: "Prince of Persia: Two Thrones",
//     completed: true,
//     order: 12,
//     gameCover: "https://i.postimg.cc/kGkjLCN8/Prince-of-Persia-Two-Thrones.jpg",
//     studio: "Ubisoft",
//     gameYear: 2005,
//     steamLink:
//       "https://store.steampowered.com/app/13530/Prince_of_Persia_The_Two_Thrones/",
//   },
//   {
//     name: "Momodora: Reverie Under The Moonlight",
//     completed: true,
//     order: 13,
//     gameCover:
//       "https://i.postimg.cc/nhq5bXPL/Momodora-Reverie-Under-The-Moonlight.jpg",
//     studio: "Bombservice",
//     gameYear: 2016,
//     steamLink:
//       "https://store.steampowered.com/app/428550/Momodora_Reverie_Under_The_Moonlight/",
//   },
//   {
//     name: "Final Fantasy VI",
//     completed: false,
//     order: 14,
//     gameCover: "https://i.postimg.cc/4dgSxsj1/Final-Fantasy-VI.jpg",
//     studio: "Square Enix",
//     gameYear: 1994,
//     steamLink: "https://store.steampowered.com/app/1173820/FINAL_FANTASY_VI/",
//   },
// ]

const handler = async (req, res) => {
  if (req.method === "GET") {
    const list = await Game.find({})
    res.status(200).json(list)
  }
  if (req.method === "POST") {
    const {
      name,
      completed = false,
      gameCover,
      studio,
      gameYear,
      steamLink,
    } = req.body
    let order
    try {
      order = await Game.countDocuments({})
    } catch (err) {
      res.send({ error: err })
    }

    const newGame = {
      name,
      completed,
      gameCover,
      studio,
      order: order + 1,
      gameYear,
      steamLink,
    }
    const game = new Game(newGame)
    try {
      const savedGame = await game.save()
      res.status(200).json(savedGame)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default connectDB(handler)
