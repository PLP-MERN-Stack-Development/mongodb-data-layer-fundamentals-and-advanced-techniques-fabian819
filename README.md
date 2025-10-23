# README — Run queries.js

Prerequisites
- Node.js installed (recommended v14+)
- MongoDB running locally (mongod) OR a MongoDB Atlas connection string
- A terminal (PowerShell or CMD) on Windows

Setup
1. Open a terminal and change to the project folder:
   cd "c:\Software development\MERN ASSIGNMENTS\MONGODB WEEK ONE\mongodb-data-layer-fundamentals-and-advanced-techniques-fabian819"

2. Install dependencies:
   npm install mongodb
   (If package.json exists with dependencies, just run `npm install`.)

3. Ensure your MongoDB server is running:
   - Local (example): run `mongod` in a separate terminal (or start the MongoDB Windows service).
   - Atlas: get the connection string from Atlas.

Configure connection (if needed)
- The script uses a URI variable at the top of `queries.js`:
  const uri = 'mongodb://localhost:27017';
- To use Atlas, replace that value with your Atlas connection string (including username/password) or edit the file accordingly.

Populate sample data (optional but recommended)
- Run the provided inserter to add sample books:
  node insert_books.js

Run the queries
- Execute the queries script (this script will run queries and perform updates/inserts/deletes):
  node queries.js

Notes
- queries.js uses the official MongoDB Node.js driver; it will modify data (updates, deletes, bulk writes). Back up data if necessary.
- If index creation fails due to duplicate titles, either remove the `unique: true` option or clean duplicates first.
- To inspect results visually, use MongoDB Compass or mongosh.

Troubleshooting
- "Cannot connect": verify `mongod` is running and the URI is correct.
- "Module not found: mongodb": run `npm install mongodb`.
- For permission/service issues on Windows, start the MongoDB service from Services or run mongod with administrator privileges.

```// filepath: c:\Software development\MERN ASSIGNMENTS\MONGODB WEEK ONE\mongodb-data-layer-fundamentals-and-advanced-techniques-fabian819\README.md
# README — Run queries.js

Prerequisites
- Node.js installed (recommended v14+)
- MongoDB running locally (mongod) OR a MongoDB Atlas connection string
- A terminal (PowerShell or CMD) on Windows

Setup
1. Open a terminal and change to the project folder:
   cd "c:\Software development\MERN ASSIGNMENTS\MONGODB WEEK ONE\mongodb-data-layer-fundamentals-and-advanced-techniques-fabian819"

2. Install dependencies:
   npm install mongodb
   (If package.json exists with dependencies, just run `npm install`.)

3. Ensure your MongoDB server is running:
   - Local (example): run `mongod` in a separate terminal (or start the MongoDB Windows service).
   - Atlas: get the connection string from Atlas.

Configure connection (if needed)
- The script uses a URI variable at the top of `queries.js`:
  const uri = 'mongodb://localhost:27017';
- To use Atlas, replace that value with your Atlas connection string (including username/password) or edit the file accordingly.

Populate sample data (optional but recommended)
- Run the provided inserter to add sample books:
  node insert_books.js

Run the queries
- Execute the queries script (this script will run queries and perform updates/inserts/deletes):
  node queries.js

Notes
- queries.js uses the official MongoDB Node.js driver; it will modify data (updates, deletes, bulk writes). Back up data if necessary.
- If index creation fails due to duplicate titles, either remove the `unique: true` option or clean duplicates first.
- To inspect results visually, use MongoDB Compass or mongosh.

Troubleshooting
- "Cannot connect": verify `mongod` is running and the URI is correct.
- "Module not found: mongodb": run `npm install mongodb`.
- For permission/service issues on Windows, start the MongoDB service from Services or run mongod with administrator privileges.
