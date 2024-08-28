const express = require('express');
const cors = require('cors');
const Router = require('./router/router');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Use routes from the router module
app.use('/api', Router);
// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
