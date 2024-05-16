require("dotenv").config();
const express = require('express');
const app = express();
const router = require("./routers/authRouter")
const PORT = process.env.PORT || 5000; // Set the port number, use the environment variable PORT if available, otherwise default to 3000
const connectDb = require("./db/conn")
const cors = require('cors');
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(cors());
app.use(express.json());

app.use("/api", router);


app.use(errorMiddleware)
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


  