// src\models\magicMover.ts
import mongoose, { Schema, Document } from 'mongoose';

/**
 * @desc    Enum representing the state of a Magic Mover.
 * @enum    MoverState
 * @property {string} RESTING - The mover is idle and not performing any tasks.
 * @property {string} LOADING - The mover is currently being loaded with items.
 * @property {string} ON_MISSION - The mover is on a mission to transport items.
 */

export enum MoverState {
  RESTING = 'resting',
  LOADING = 'loading',
  ON_MISSION = 'on-mission'
}

/**
 * @desc    Interface for a Magic Mover document in the database.
 * @interface IMagicMover
 * @extends  {Document} - Mongoose Document
 * @property {string} name - The name of the Magic Mover.
 * @property {number} weightLimit - The maximum weight the mover can carry.
 * @property {number} currentWeight - The current weight the mover is carrying.
 * @property {MoverState} state - The current state of the mover (e.g., RESTING, LOADING, ON_MISSION).
 * @property {mongoose.Types.ObjectId[]} items - List of item IDs currently assigned to the mover.
 * @property {number} completedMissions - The number of missions successfully completed by the mover.
 */

export interface IMagicMover extends Document {
  name: string;
  weightLimit: number;
  currentWeight: number;
  state: MoverState;
  items: mongoose.Types.ObjectId[];
  completedMissions: number;
}

/**
 * @desc    Mongoose schema for Magic Mover.
 * @schema  magicMoverSchema
 * @property {string} name - The name of the Magic Mover. This field is required.
 * @property {number} weightLimit - The maximum weight the mover can carry. This field is required.
 * @property {number} currentWeight - The current weight the mover is carrying. Defaults to 0.
 * @property {string} state - The current state of the mover. Defaults to 'RESTING'.
 * @property {mongoose.Types.ObjectId[]} items - References to the items assigned to the mover.
 * @property {number} completedMissions - The number of missions completed by the mover. Defaults to 0.
 * @timestamps Automatically adds `createdAt` and `updatedAt` timestamps.
 */

const magicMoverSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  weightLimit: { 
    type: Number, 
    required: true 
  },
  currentWeight: { 
    type: Number, 
    default: 0 
  },
  state: { 
    type: String, 
    enum: Object.values(MoverState),
    default: MoverState.RESTING 
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'MagicItem'
  }],
  completedMissions: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

/**
 * @desc    Magic Mover model for interacting with the Magic Mover collection in MongoDB.
 * @model   MagicMover
 */

export const MagicMover = mongoose.model<IMagicMover>('MagicMover', magicMoverSchema);
