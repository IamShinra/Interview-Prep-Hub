import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRouter from "./routes/authrouter.js"
import blogRouter from "./routes/blogrouter.js"
import User from "./models/user.js"
import appointmentRouter from "./routes/appointmentrouter.js"
import emailRouter from "./routes/email.js"
import dotenv from "dotenv"

// app config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const mongoURI = process.env.MONGODB_URI;

// middlewares
app.use(express.json());
app.use(cors());

// db config
mongoose.connect(mongoURI)
    .then(() => console.log("connected to db"))
    .catch((error) => console.log(error));

// api endpoints
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/findUserByEnrollment/:enrollment", async (req, res) => {
    const enrollment = req.params.enrollment;
    try {
        const user = await User.findOne({ enrollnmentNo: enrollment });  
        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).send("User not found"); 
        }
    } catch (err) {
        console.error('Error occurred:', err); 
        res.status(500).send("Connection error"); 
    }
});


app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/appointment", appointmentRouter);
app.use("/api/email", emailRouter);

// listener 
app.listen(port, () => console.log(`listening on localhost: ${port}`));
