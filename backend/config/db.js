const mongoose = require("mongoose");


async function db() {

    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("DB connected successfully");
        }).catch((err) => {
            console.log(err);
        })

}

module.exports = { db };