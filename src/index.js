import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/dbConnection.js";

dotenv.config({
  path: "./.env",
});

const port = 8000;

connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`server is running on http://localhost:${port}`),
    );
  })
  .catch((err) => {
    console.error(err, "db not get connect");
    process.exit(1);
  });
