import Game from "../models/Game.mjs";

export const createGame = async (req, res) => {
  try {
    const { name } = req.body;

    const game = await Game.create({ name });
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
    const game = await Game.findById(req.params.id);
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

    const game = await Game.findById(id).populate("users");
    if (!game) {
      return res.status(404).json({
        status: "fail",
        message: "Game not found",
      });
    }

    console.log("game", game);
    if (game.users.map((user) => user?._id).includes(player?._id)) {
      return res.status(400).json({
        status: "fail",
        message: "Player already in game",
      });
    } else {
        console.log('2222222', player)
        game.users.push(player);
        await game.save();
    }
    res.status(200).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (error) {
    console.error("Error adding player to game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
