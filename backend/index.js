require('dotenv').config()
const express = require("express");
const cors = require("cors");
const { db } = require('./config/db');
const { userRouter } = require('./routes/user.route');
const { postRouter } = require('./routes/post.route');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT
db();


app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);


app.listen(port, (req, res) => {
    console.log(`server is listening to Port ${port}`)
})