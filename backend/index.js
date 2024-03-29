require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const pay = require("./routes/payment");
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const port = process.env.PORT || 7001;
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api", routes, pay);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
