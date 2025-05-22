import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  playerCharacters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerCharacter",
    },
  ],
  nonPlayerCharacters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NonPlayerCharacter",
    },
  ],
//     gameMaster: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
//     quests: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Quest",
//         },
//     ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
