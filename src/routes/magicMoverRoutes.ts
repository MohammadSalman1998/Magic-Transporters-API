// src\routes\magicMoverRoutes.ts
import express, { Router } from 'express';
import {
  addMagicMover,
  allMagicMover,
  deleteMagicMoverByID,
  editMagicMover,
  getMagicMoverByID,
} from "../controllers/magicMoverController";

const router:Router = express.Router();

/**
 * @desc    Routes for Magic Movers.
 */
router
  /**
   * @route   POST /api/movers
   * @desc    Add a new Magic Mover.
   * @access  public
   */
  .post("/", addMagicMover)

  /**
   * @route   GET /api/movers
   * @desc    Retrieve all Magic Movers.
   * @access  public
   */
  .get("/", allMagicMover);

router
  /**
   * @route   GET /api/movers/:id
   * @desc    Retrieve a Magic Mover by ID.
   * @access  public
   */
  .get("/:id", getMagicMoverByID)

  /**
   * @route   PUT /api/movers/:id
   * @desc    Edit an existing Magic Mover by ID.
   * @access  public
   */
  .put("/:id", editMagicMover)

  /**
   * @route   DELETE /api/movers/:id
   * @desc    Delete a Magic Mover by ID.
   * @access  public
   */
  .delete("/:id", deleteMagicMoverByID);

export default router;
