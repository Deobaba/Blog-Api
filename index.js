const app = require('./app')
require('dotenv').config()
const connectDb = require('./config/db')

//connect to database
connectDb();


app.listen(process.env.PORT, () => {
    console.log("server on!!!");
  });
  