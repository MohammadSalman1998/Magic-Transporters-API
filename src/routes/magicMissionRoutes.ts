// src\routes\magicMissionRoutes.ts
import express, { Router } from 'express';
import {
  loadMagicMover,
  startMission,
  endMission,
  getMostActiveMover,
  getlogs
} from '../controllers/magicMissionController';

const router: Router = express.Router();

/**
 * @desc    Routes for managing Magic Mover missions.
 */

router
  /**
   * @route   POST /api/missions/load
   * @desc    Load items onto a Magic Mover.
   * @access  public
   */
  .post('/load', loadMagicMover)

  /**
   * @route   POST /api/missions/start
   * @desc    Start a mission for a Magic Mover.
   * @access  public
   */
  .post('/start', startMission)

  /**
   * @route   POST /api/missions/end
   * @desc    End a mission for a Magic Mover.
   * @access  public
   */
  .post('/end', endMission);

router
  /**
   * @route   GET /api/missions/mostActive
   * @desc    Get the most active Magic Mover(s) based on completed missions.
   * @access  public
   */
  .get('/mostActive', getMostActiveMover)

  /**
   * @route   GET /api/missions/log
   * @desc    Retrieve all mission logs in descending order of timestamps.
   * @access  public
   */
  .get('/log', getlogs);

  
  export default router;