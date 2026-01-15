import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

const authRouter = express.Router();

const userLogin = async (req, res) => {
    const userData = req.body;
    try {
        const user = await User.findOne({ enrollnmentNo: userData.enrollnmentNo });
        if (user) {
            const match = await bcrypt.compare(userData.password, user.password);
            if (match) {
                res.status(200).json({
                    message: "Login successful",
                    user: user
                });
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
}

const userSignup = async (req, res) => {
    const { name, enrollnmentNo, password, email } = req.body;
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, enrollnmentNo, email, password: hashedPassword });
        res.status(200).send("Account Created");
    } catch (err) {
        if (err.code === 11000) {
            // Check if the error is due to a duplicate key (unique constraint violation)
            res.status(409).send('Enrollment number must be unique'); // Custom error message
        } else {
            res.status(500).send("Internal server error");
        }
    }
}

authRouter.route("/login")
    .post(userLogin);

authRouter.route("/signup")
    .post(userSignup);

export default authRouter;