const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model.js');

const userRouter = Router();


userRouter.post("/signup", async (req, res) => {

    try {
        const { username, name, email, password } = req.body;

        const signupValidation = z.object({
            email: z.email().min(7).max(20),
            password: z.string(),
            name: z.string().min(3).max(15),
            username: z.string().min(3).max(15),
        }
        )

        const isValidation = await signupValidation.safeParse(req.body)

        if (!isValidation.success) {
            return res.status(400).json({
                msg: isValidation.error.message,
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            email,
            password: hashPassword,
            username,
            name
        })

        console.log(user);

        res.status(200).json(
            {
                msg: "U Signed Up"
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                msg: "Server error",
                error: err.message
            }
        );
    }

})


userRouter.post("/login", async (req, res) => {


    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                msg: "user not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                msg: "Invalid credentials"
            })
        } else {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            res.json({
                token,
                userId: user._id.toString(),
                msg: "U Logged In"
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
}
)


module.exports = { userRouter }