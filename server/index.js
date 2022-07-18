const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoute')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connection successful");
})
.catch((err) => {
    console.log(err.message);
});

// Runs the backend server on port 5000
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
});