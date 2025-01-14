const app = require('./app');

// port No
const port = 3000;

// start the server:
// Listen to incoming req on this port no
// 1.  Now to start the server we will use - node server.js

// 2. Bcz we have a added a start script in package.json in which we have mentioned the start file
// we can directly use npm start as well to start the server.
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
