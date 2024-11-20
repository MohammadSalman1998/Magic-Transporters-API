// src\controllers\magicMissionController.ts
import { Request, Response } from "express";
import { MagicMover, MoverState } from "../models/magicMover";
import mongoose from "mongoose";
import { MissionLog } from "../models/MissionLog";
import { MagicItem } from "../models/magicItem";

/**
 * @desc    Load items onto a Magic Mover.
 * @route   POST /api/movers/load
 * @access  public
 * @param   {Request} req - Express request object containing `moverId` and `itemIds` in the body.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the updated mover or an error message.
 * @throws  {Error} 400 - Validation error if the weight exceeds the mover's limit or other issues occur.
 * @throws  {Error} 404 - If the Magic Mover or items are not found.
 */

export const loadMagicMover = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { moverId, itemIds } = req.body;
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      res.status(404).json({ message: "Mover not found" });
      return;
    }
    const items = await MagicItem.find({ _id: { $in: itemIds } });
    const totalWeight = items.reduce((total, item) => total + item.weight, 0);
    if (totalWeight > mover.weightLimit - mover.currentWeight) {
      res
        .status(400)
        .json({
          message: `Maximum weight exceeded, total weight: ${
            mover.weightLimit
          }kg, remaining weight: ${mover.weightLimit - mover.currentWeight}kg`,
        });
      return;
    }
    mover.items = [
      ...mover.items,
      ...items.map((item) => item._id as mongoose.Types.ObjectId),
    ];
    mover.currentWeight += totalWeight;
    mover.state = MoverState.LOADING;
    await mover.save();
    await MissionLog.create({
      mover: mover._id,
      action: "LOAD",
      items: items.map((item) => item._id),
      state: mover.state,
    });
    res.status(200).json(mover);
  } catch (error) {
    res.status(400).json({ message: "field " });
  }
};

/**
 * @desc    Start a mission for a Magic Mover.
 * @route   POST /api/movers/start-mission
 * @access  public
 * @param   {Request} req - Express request object containing `moverId` in the body.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the updated mover or an error message.
 * @throws  {Error} 400 - If the mover is not in the "loading" state or other validation issues occur.
 * @throws  {Error} 404 - If the Magic Mover is not found.
 */


export const startMission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { moverId } = req.body;
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      res.status(404).json({ message: "Mover not found" });
      return;
    }
    if (mover.state !== MoverState.LOADING) {
      res
        .status(400)
        .json({ message: "Mover must be in loading state to start a mission" });
      return;
    }
    mover.state = MoverState.ON_MISSION;
    await mover.save();
    await MissionLog.create({
      mover: mover._id,
      action: "START_MISSION",
      state: mover.state,
    });
    res.status(200).json(mover);
  } catch (error) {
    res.status(400).json({ message: "field " });
  }
};

/**
 * @desc    End a mission for a Magic Mover.
 * @route   POST /api/movers/end-mission
 * @access  public
 * @param   {Request} req - Express request object containing `moverId` in the body.
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the updated mover or an error message.
 * @throws  {Error} 400 - If the mover is not in the "on mission" state or other validation issues occur.
 * @throws  {Error} 404 - If the Magic Mover is not found.
 */


export const endMission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { moverId } = req.body;
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      res.status(404).json({ message: "Mover not found" });
      return;
    }
    if (mover.state !== MoverState.ON_MISSION) {
      res.status(400).json({ message: "Mover must be on mission to end it" });
      return;
    }
    mover.items = [];
    mover.currentWeight = 0;
    mover.state = MoverState.RESTING;
    mover.completedMissions += 1;
    await mover.save();
    await MissionLog.create({
      mover: mover._id,
      action: "END_MISSION",
      state: mover.state,
    });
    res.status(200).json(mover);
  } catch (error) {
    res.status(400).json({ message: "field " });
  }
};

/**
 * @desc    Get the most active Magic Mover(s) based on completed missions.
 * @route   GET /api/movers/most-active
 * @access  public
 * @param   {Request} req - Express request object (no specific parameters required).
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with the most active mover(s) or an error message.
 * @throws  {Error} 400 - If an error occurs during the query.
 */


export const getMostActiveMover = async (req: Request, res: Response) => {
  try {
    const maxCompletedMissions = await MagicMover.find()
      .sort({ completedMissions: -1 })
      .select("-__v")
      res.status(200).json(maxCompletedMissions);
  } catch (error) {
    res.status(400).json({ message: "field " });
  }
};

/**
 * @desc    Retrieve all mission logs in descending order of timestamps.
 * @route   GET /api/logs
 * @access  public
 * @param   {Request} req - Express request object (no specific parameters required).
 * @param   {Response} res - Express response object for sending status and data back to the client.
 * @returns {Promise<void>} - Sends a JSON response with all mission logs or an error message.
 * @throws  {Error} 400 - If an error occurs during the query.
 */


export const getlogs = async (req: Request, res: Response) => {
    try {
      const logs = await MissionLog.find()
        .sort({ timestamp: -1 })
        res.status(200).json(logs);
    } catch (error) {
      res.status(400).json({ message: "field " });
    }
  };