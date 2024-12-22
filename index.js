const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ALLOWED_URLS = process.env.ALLOWED_URLS;

app.use(
  cors({
    origin: (origin, callback) => {
      if (ALLOWED_URLS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//Routes
app.use("/api/sendEmail", require("./routes/sendEmailRoute"));

app.get("/", (req, res) => {
  res.json("Recevied");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
