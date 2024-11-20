// src\routes\magicItemRoutes.ts
import express, { Router } from 'express';
import { addMagicItem, allMagicItems, deleteMagicItemByID, editMagicItem, getMagicItemByID } from "../controllers/magicItemController";


const router: Router = express.Router();

/**
 * @desc    Routes for Magic Items.
 */

router.route("/")

/**
 * @route   POST /api/items
 * @desc    Add a new Magic Item to the system.
 * @access public
 */

.post(addMagicItem)

/**
 * @route   GET /api/items
 * @desc    Retrieve all Magic Items.
 * @access  public
 */

.get(allMagicItems)

router.route("/:id")

/**
 * @route   GET /api/items/:id
 * @desc    Retrieve a Magic Item by its ID.
 * @access  public
 */

  .get(getMagicItemByID)

/**
 * @route   PUT /api/items/:id
 * @desc    Edit an existing Magic Item by ID.
 * @access  public
 */

  .put(editMagicItem)

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete a Magic Item by its ID.
 * @access  public
 */

  .delete(deleteMagicItemByID);

export default router;
