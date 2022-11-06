const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

let mongoDb_uri;
let DB;

if (process.env.NODE_ENV == "development") {
  mongoDb_uri = process.env.MONGO_URI;
  DB = "development";
} else {
  mongoDb_uri = process.env.TEST_URI;
  DB = "test";
}
const connectDb = async () => {
  mongoose.connect(mongoDb_uri);

  const db = mongoose.connection;
  db.on("error", ()=>{
    console.log(`error occurred while connecting ${DB} database`)
  });
  db.on("connected", () => {
    console.log(`connected to ${DB} database successfully`);
  });
};

//export database
module.exports = connectDb;
