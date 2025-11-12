import express from "express";
import "dotenv/config"
import { ENV } from "./config/env.js";
import dbConnect from "./config/db.js";
import parentRoutes from "./routes/parentRoute.js"
import childRoutes from "./routes/childRoute.js"

dbConnect();

const app = express();
const PORT = ENV.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/parent', parentRoutes)
app.use('/api/parent/:parentId/children', childRoutes);

app.get("/", (req, res) => {
    res.send("B for Bunny Backend API is running!");
});

app.listen(PORT, ()=>{
    console.log(`Backend Server is running on PORT:${PORT}`);
    console.log(`Node Environment is ${ENV.NODE_ENV}`);
})