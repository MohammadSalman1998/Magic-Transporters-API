// src\models\MissionLog.ts
import mongoose, { Schema, Document } from 'mongoose';
import { MoverState } from './magicMover';

/**
 * @desc    Interface for a Mission Log document in the database.
 * @interface IMissionLog
 * @extends  {Document} - Mongoose Document
 * @property {mongoose.Types.ObjectId} mover - Reference to the Magic Mover associated with this log.
 * @property {string} action - The action performed (e.g., LOAD, START_MISSION, END_MISSION).
 * @property {mongoose.Types.ObjectId[]} [items] - List of item IDs involved in the action (optional).
 * @property {MoverState} state - The state of the Magic Mover during this action.
 * @property {Date} timestamp - The timestamp of the logged action.
 */

export interface IMissionLog extends Document {
  mover: mongoose.Types.ObjectId;
  action: string;
  items?: mongoose.Types.ObjectId[];
  state: MoverState;
  timestamp: Date;
}

/**
 * @desc    Mongoose schema for Mission Log.
 * @schema  missionLogSchema
 * @property {mongoose.Types.ObjectId} mover - Reference to the Magic Mover associated with this log. This field is required.
 * @property {string} action - The action performed. Must be one of ['LOAD', 'START_MISSION', 'END_MISSION'].
 * @property {mongoose.Types.ObjectId[]} items - References to items involved in the action (optional).
 * @property {string} state - The state of the Magic Mover. Must match one of the `MoverState` values.
 * @property {Date} timestamp - The timestamp of the logged action. Defaults to the current date and time.
 */

const missionLogSchema = new Schema({
  mover: {
    type: Schema.Types.ObjectId,
    ref: 'MagicMover',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['LOAD', 'START_MISSION', 'END_MISSION']
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'MagicItem'
  }],
  state: {
    type: String,
    enum: Object.values(MoverState),
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

/**
 * @desc    Mission Log model for interacting with the Mission Log collection in MongoDB.
 * @model   MissionLog
 */

export const MissionLog = mongoose.model<IMissionLog>('MissionLog', missionLogSchema);
