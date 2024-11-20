// src\models\magicItem.ts

import mongoose, { Schema, Document } from 'mongoose';

/**
 * @desc    Interface for a Magic Item document in the database.
 * @interface IMagicItem
 * @extends  {Document} - Mongoose Document
 * @property {string} name - The name of the magic item.
 * @property {number} weight - The weight of the magic item.
 */

export interface IMagicItem extends Document {
  name: string;
  weight: number;
}

/**
 * @desc    Mongoose schema for Magic Item.
 * @schema  magicItemSchema
 * @property {string} name - The name of the magic item. This field is required.
 * @property {number} weight - The weight of the magic item. This field is required.
 * @timestamps Automatically adds `createdAt` and `updatedAt` timestamps.
 */

const magicItemSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  weight: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

/**
 * @desc    Magic Item model for interacting with the Magic Item collection in MongoDB.
 * @model   MagicItem
 */

export const MagicItem = mongoose.model<IMagicItem>('MagicItem', magicItemSchema);
