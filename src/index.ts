// src\index.ts
import express from 'express';
import mongoose from 'mongoose';
import magicMoverRoutes from './routes/magicMoverRoutes';
import magicItemRoutes from './routes/magicItemRoutes';
import magicMissionRoutes from './routes/magicMissionRoutes';
import dotenv from 'dotenv'

dotenv.config() 

export const app = express();
const PORT = 3000;
const mongoDBUserName = process.env.mongoDBUserName
const mongoDBPassword = process.env.mongoDBPassword

/**
 * @desc    Connect to MongoDB database.
 * @function connectDB
 * @returns {void}
 * @throws  {Error} If MongoDB connection fails.
 */

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${mongoDBUserName}:${mongoDBPassword}@magictransporters.mitvx.mongodb.net/?retryWrites=true&w=majority&appName=MagicTransporters`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

/**
 * @desc    Middleware to parse JSON requests.
 * @middleware express.json()
 * @returns {void} 
 */

// Middleware
app.use(express.json());

/**
 * @desc    Define routes for the Magic Movers, Magic Items, and Magic Missions.
 * @routes  /api/movers -> magicMoverRoutes
 *          /api/items -> magicItemRoutes
 *          /api/mission -> magicMissionRoutes
 */

app.use('/api/movers', magicMoverRoutes);
app.use('/api/items', magicItemRoutes);
app.use('/api/mission', magicMissionRoutes);

/**
 * @desc    Start the Express server on the specified port.
 * @function startServer
 * @param   {number} PORT - Port on which the server will listen.
 * @returns {void}
 */

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
