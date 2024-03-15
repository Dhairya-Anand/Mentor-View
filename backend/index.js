const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const mentorRoute = require("./routes/mentor.route");
const studentRoute = require("./routes/student.route");

const connectToMongoDB = require("./db/database.connection");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin:"*",
}))

app.use("/api/mentor", mentorRoute);
app.use("/api/student", studentRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
