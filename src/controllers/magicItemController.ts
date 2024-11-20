// src\controllers\magicItemController.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import { MagicItem } from "../models/magicItem";

/**
 * @desc    Add a new Magic Item to the system.
 * @route   POST /api/items
 * @access  public
 * @param   {Request} req - Express request object containing `name` and `weight` in the body.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the created Magic Item or an error message.
 * @throws  {Error} 500 - Internal server error if item creation fails.
 * @throws  {Error} 400 - Validation error if input data is invalid.
 */


export const addMagicItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, weight } = req.body;
    // Validate input
    if (!name || !weight || typeof weight !== "number") {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }
    const mover = new MagicItem({ name, weight });
    await mover.save();
    res.status(201).json(mover);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "field created" });
  }
};

/**
 * @desc    Edit an existing Magic Item by ID.
 * @route   PUT /api/items/:id
 * @access  public
 * @param   {Request} req - Express request object containing `name` and `weight` in the body, and `id` in params.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the updated item or an error message.
 * @throws  {Error} 500 - Internal server error if update fails.
 * @throws  {Error} 400 - Validation error if input data is invalid or the ID is not found.
 */



export const editMagicItem = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name, weight } = req.body;
      const itemID = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(itemID)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }
      const item = await MagicItem.findByIdAndUpdate(
        itemID,
        {
          $set: {
            name,
            weight
          },
        },
        { new: true }
      );
      if (!item) {
        res.status(400).json({ message: "this item not found" });
        return;
      }
  
      res
        .status(200)
        .json({ message: "the item has been updated successfully", item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "field updated" });
    }
  };


  /**
 * @desc    Retrieve all Magic Items from the system.
 * @route   GET /api/items
 * @access  public
 * @param   {Request} req - Express request object (no specific parameters required).
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the list of all Magic Items or an error message.
 * @throws  {Error} 500 - Internal server error if retrieval fails.
 */

export const allMagicItems = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const items = await MagicItem.find();
      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "field found them" });
    }
  };


/**
 * @desc    Retrieve a single Magic Item by its ID.
 * @route   GET /api/items/:id
 * @access  public
 * @param   {Request} req - Express request object with `id` in params.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the requested Magic Item or an error message.
 * @throws  {Error} 500 - Internal server error if retrieval fails.
 * @throws  {Error} 400 - Validation error if the ID format is invalid or the item is not found.
 */

export const getMagicItemByID = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const itemID = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(itemID)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }
      const item = await MagicItem.findById(itemID);
      if (!item) {
        res.status(400).json({ message: "this item not found" });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "field found it" });
    }
  };

/**
 * @desc    Delete a Magic Item by its ID.
 * @route   DELETE /api/items/:id
 * @access  public
 * @param   {Request} req - Express request object with `id` in params.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response confirming deletion or an error message.
 * @throws  {Error} 500 - Internal server error if deletion fails.
 * @throws  {Error} 400 - Validation error if the ID format is invalid or the item is not found.
 */


export const deleteMagicItemByID = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const itemID = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(itemID)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }
      const item = await MagicItem.findById(itemID);
      if (!item) {
        res.status(400).json({ message: "this item not found" });
        return;
      }
      const itemdeleted = await MagicItem.findByIdAndDelete(itemID);
      res
        .status(200)
        .json({
          message: "the item has been deleted successfully",
          itemdeleted,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "field delete it" });
    }
  };
  