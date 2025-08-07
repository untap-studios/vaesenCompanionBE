import Game from "../models/Game.mjs";
import User from "../models/User.mjs";

export const createGame = async (req, res) => {
  try {
    const { name, description, imageUrl, users, gameMaster } = req.body;

    console.log('hello', req.body)
    const game = await Game.create({ name, description, imageUrl, users, gameMaster });
    res.status(201).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json({
      status: "success",
      results: games.length,
      data: {
        games,
      },
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("users");
    if (!game) {
      return res.status(404).json({
        status: "fail",
        message: "Game not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addPlayerToGame = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", req.params);
    const player = req.body;
    console.log("player", player);

    const user = await User.findById(player._id);
    const game = await Game.findById(id).populate("users");
    if (!game) {
      return res.status(404).json({
        status: "fail",
        message: "Game not found",
      });
    }

    if (game.users.some((user) => user?._id.equals(player?._id))) {
      return res.status(400).json({
        status: "fail",
        message: "Player already in game",
      });
    } else {
        game.users.push(user._id);
        await game.save();
        user.games.push(game);
        await user.save();
    }
    res.status(200).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (error) {
    console.error("Error adding player to game:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
