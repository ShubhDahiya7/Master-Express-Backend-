const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Now that .env file is just a text file so far but to connect it with node
// we use dotenv package and import it.
// Now it will read from config.env file and save them to our node env variables.
// to make these env var through out the app we need to read them before we import app.
dotenv.config({ path: './config.env' });

const app = require('./app');

// To see the env variable
// console.log(process.env);

// Lets set the pswd in our connection url
const db = process.env.DB_CONNECTION_URL.replace(
  '<db_password>',
  process.env.DB_PASSWORD
);

// connect to db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connection);
    console.log('db connection successfull');
  });

// port No
const port = process.env.PORT;

// start the server:
// Listen to incoming req on this port no
// 1.  Now to start the server we will use - node server.js

// 2. Bcz we have a added a start script in package.json in which we have mentioned the start file
// we can directly use npm start as well to start the server.
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
