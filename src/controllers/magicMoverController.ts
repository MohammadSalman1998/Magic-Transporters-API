// src\controllers\magicMoverController.ts
import { Request, Response } from "express";
import { MagicMover } from "../models/magicMover";
import mongoose from "mongoose";


/**
 * @desc    Add a new Magic Mover to the system.
 * @route   POST /api/movers
 * @access  public
 * @param   {Request} req - Express request object containing `name` and `weightLimit` in the body.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the created Magic Mover or an error message.
 * @throws  {Error} 500 - Internal server error if creation fails.
 * @throws  {Error} 400 - Validation error if input data is invalid.
 */


export const addMagicMover = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, weightLimit } = req.body;
    // Validate input
    if (!name || !weightLimit || typeof weightLimit !== "number") {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }
    const mover = new MagicMover({ name, weightLimit });
    await mover.save();
    res.status(201).json(mover);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "field created" });
  }
};

/**
 * @desc    Edit an existing Magic Mover by ID.
 * @route   PUT /api/movers/:id
 * @access  public
 * @param   {Request} req - Express request object containing `name`, `weightLimit`, `completedMissions`, and `state` in the body, and `id` in params.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the updated Magic Mover or an error message.
 * @throws  {Error} 500 - Internal server error if update fails.
 * @throws  {Error} 400 - Validation error if input data is invalid or the ID format is incorrect.
 */


export const editMagicMover = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, weightLimit, completedMissions, state } = req.body;
    const moverID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(moverID)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }
    const mover = await MagicMover.findByIdAndUpdate(
      moverID,
      {
        $set: {
          name,
          weightLimit,
          completedMissions,
          state,
        },
      },
      { new: true }
    );
    if (!mover) {
      res.status(400).json({ message: "this mover not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "the mover has been updated successfully", mover });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "field updated" });
  }
};

/**
 * @desc    Retrieve all Magic Movers from the system.
 * @route   GET /api/movers
 * @access  public
 * @param   {Request} req - Express request object (no specific parameters required).
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the list of all Magic Movers or an error message.
 * @throws  {Error} 500 - Internal server error if retrieval fails.
 */


export const allMagicMover = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movers = await MagicMover.find();
    res.status(200).json(movers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "field found them" });
  }
};

/**
 * @desc    Retrieve a single Magic Mover by its ID.
 * @route   GET /api/movers/:id
 * @access  public
 * @param   {Request} req - Express request object with `id` in params.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the requested Magic Mover or an error message.
 * @throws  {Error} 500 - Internal server error if retrieval fails.
 * @throws  {Error} 400 - Validation error if the ID format is invalid or the mover is not found.
 */


export const getMagicMoverByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const moverID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(moverID)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }
    const mover = await MagicMover.findById(moverID);
    if (!mover) {
      res.status(400).json({ message: "this mover not found" });
      return;
    }
    res.status(200).json(mover);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "field found it" });
  }
};

/**
 * @desc    Delete a Magic Mover by its ID.
 * @route   DELETE /api/movers/:id
 * @access  public
 * @param   {Request} req - Express request object with `id` in params.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response confirming deletion or an error message.
 * @throws  {Error} 500 - Internal server error if deletion fails.
 * @throws  {Error} 400 - Validation error if the ID format is invalid or the mover is not found.
 */


export const deleteMagicMoverByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const moverID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(moverID)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }
    const mover = await MagicMover.findById(moverID);
    if (!mover) {
      res.status(400).json({ message: "this mover not found" });
      return;
    }
    const moverdeleted = await MagicMover.findByIdAndDelete(moverID);
    res
      .status(200)
      .json({
        message: "the mover has been deleted successfully",
        moverdeleted,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "field delete it" });
  }
};

