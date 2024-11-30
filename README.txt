============================ Magic Transporters API ============================

Magic Transporters is a backend application for managing transporters (Magic Movers), 
items, and their missions. It provides a RESTful API built with Node.js, Express, and MongoDB.
The application supports features such as item management, mission logs, and transporter state tracking.

============================ Features ============================
- Manage Magic Movers:
    -Add, edit, delete, and retrieve movers.
    -Track movers' current states and completed missions.
-Manage Magic Items:
    -Add, edit, delete, and retrieve items.
-Handle Missions:
    -Load items onto movers.
    -Start and end missions.
    -Track mission logs and mover activity.


============================ Technologies Used ============================
Node.js: Backend runtime.
Express: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing movers, items, and logs.
TypeScript: Type-safe codebase for reliability and maintainability.

============================ Installation and Setup ============================

1. Clone the Repository
    - https://github.com/MohammadSalman1998/Magic-Transporters-API.git
    - git@github.com:MohammadSalman1998/Magic-Transporters-API.git

2. Install Dependencies
    - npm install

3. Set Up Environment Variables
    - mongoDBUserName = 
    - mongoDBPassword = 

4. Start the Application
    - Development Mode: npm run dev
    - Production Mode: npm start

============================ API Endpoints ============================

 ///////////////// Magic Movers /////////////

Method	            Endpoint	            Description
POST	            /api/movers	            Add a new Magic Mover.
GET	                /api/movers	            Get all Magic Movers.
GET	                /api/movers/:id	        Get a Magic Mover by ID.
PUT	                /api/movers/:id	        Edit a Magic Mover by ID.
DELETE	            /api/movers/:id	        Delete a Magic Mover by ID.

///////////////// Magic Items /////////////

Method	            Endpoint	            Description
POST	            /api/items	            Add a new Magic Item.
GET	                /api/items	            Get all Magic Items.
GET	                /api/items/:id	        Get a Magic Item by ID.
PUT	                /api/items/:id	        Edit a Magic Item by ID.
DELETE	            /api/items/:id	        Delete a Magic Item by ID.

///////////////// Magic Missions /////////////

Method	          Endpoint	                     Description
POST	          /api/missions/load	        Load items onto a Magic Mover.
POST	          /api/missions/start	        Start a mission for a Magic Mover.
POST	          /api/missions/end	            End a mission for a Magic Mover.
GET	              /api/missions/mostActive      Get the most active Magic Mover(s).
GET	              /api/missions/log	            Get all mission logs.

============================ Documentation ============================
The project uses postman for API documentation. Once the application is running, you can access the live documentation at:

https://raw.githubusercontent.com/MohammadSalman1998/Magic-Transporters-API/refs/heads/main/docs/Magic%20Transporters.postman_collection.json

============================ Project Structure ============================

/src
  /controllers  # API logic
  /models       # MongoDB schemas
  /routes       # Route definitions
  /index.ts        # server page
/docs
  /Magic Transporters.postman_collection.json
