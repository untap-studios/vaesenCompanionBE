import mongoose from 'mongoose';

const npcSchema = new mongoose.Schema({
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
  },
  physicalDescription: {
    type: String,
  },
  isVaesen: {
    type: Boolean,
    default: false,
  },
  currentLocation: {
    type: String,
  },
});

const NonPlayerCharacter = mongoose.model('NonPlayerCharacter', npcSchema);

export default NonPlayerCharacter;
