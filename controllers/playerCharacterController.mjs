import { CharacterSheet } from "../models/PlayerCharacter.mjs";
import User from "../models/User.mjs";

export const getPlayerCharacter = async (req, res) => {
    try {
        const character = await CharacterSheet.findById(req.params.id);
        if (!character) {
            return res.status(404).json({
                status: "fail",
                message: "Character not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                character,
            },
        });
    } catch (error) {
        console.error("Error fetching character:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createPlayerCharacterAndAddToUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const characterData = req.body;
        console.log('characterData', characterData);
        console.log('userId', userId);
        
        const newCharacter = await CharacterSheet.create(characterData);

        await User.findByIdAndUpdate(userId, {
        $push: { playerCharacters: newCharacter._id }
        });
    
        res.status(201).json({
        status: "success",
        data: {
            character: newCharacter,
        },
        });
    } catch (error) {
        console.error("Error creating player character:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}