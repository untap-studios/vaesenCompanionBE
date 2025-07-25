import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PlayerCharacterSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  CharacterSheet: {
    type: Schema.Types.ObjectId,
    ref: "CharacterSheet",
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

// CharacterSheet Schema
const CharacterSheetSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  archetype: { type: String },
  motivation: { type: String },
  trauma: { type: String },
  darkSecret: { type: String },
  relationships: [
    {
      characterName: { type: String, required: true },
      relationshipDescription: { type: String },
    },
  ],
  talents: [
    {
      name: { type: String, required: true },
      description: { type: String },
    },
  ],
  advantages: [
    {
      name: { type: String },
      description: { type: String },
    },
  ],
  insightsAndDefects: [
    {
      name: { type: String },
      description: { type: String },
    },
  ],
  equipment: [
    {
      name: { type: String, required: true },
      description: { type: String },
      bonus: { type: Number },
    },
  ],
  armor: [
    {
      name: { type: String },
      description: { type: String },
      protection: { type: Number },
      agility: { type: Number },
    },
  ],
  weapons: [
    {
      name: { type: String, required: true },
      description: { type: String },
      damage: { type: Number },
      longRange: { type: Number },
      shortRange: { type: Number },
      bonus: { type: Number },
    },
  ],
  mementos: [
    {
      name: { type: String, required: true },
      description: { type: String },
    },
  ],
  attributes: [
    {
      name: { type: String, required: true },
      value: { type: Number }
    },
  ],
  resources: { type: Number },
  conditions: [
    {
      type: { type: String },
      name: { type: String },
      description: { type: String },
      value: { type: Number },
    },
  ],
  skills: [
    {
      name: { type: String, required: true },
      attributeType: { type: String },
      value: { type: Number },
    },
  ],
  experiencePoints: { type: Number },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

// Export Models
export const PlayerCharacter = model("PlayerCharacter", PlayerCharacterSchema);
export const CharacterSheet = model("CharacterSheet", CharacterSheetSchema);