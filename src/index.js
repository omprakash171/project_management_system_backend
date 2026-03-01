import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});
import app from "./app.js";
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listen at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
    process.exit(1);
  });
