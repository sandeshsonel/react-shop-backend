const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database Connection Successfully..");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
