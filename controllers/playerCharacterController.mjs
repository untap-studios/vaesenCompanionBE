import { CharacterSheet } from "../models/PlayerCharacter.mjs";
import User from "../models/User.mjs";

export const createPlayerCharacterAndAddToUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const characterData = req.body;
        console.log('characterData', characterData);
        console.log('userId', userId);
        // Create a new player character
        const newCharacter = await CharacterSheet.create(characterData);
    
        // Add the new character to the user's characters array
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