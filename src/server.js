import express from "express";
import cors from "cors"
import "dotenv/config"
import { ENV } from "./config/env.js";
import dbConnect from "./config/db.js";
import parentRoutes from "./routes/parentRoute.js"
import childRoutes from "./routes/childRoute.js"
import gameRoutes from "./routes/gameRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import problemSetRoutes from "./routes/problemSetRoute.js"
import problemRoutes from "./routes/problemRoute.js"
import heartRoutes from "./routes/heartAPIRoute.js"

dbConnect();

const app = express();
const PORT = ENV.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/parent', parentRoutes)
app.use('/api/parent/:parentId/children', childRoutes);
app.use('/api/parent/:parentId/children/:childId/game', gameRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/:adminId/problemset', problemSetRoutes);
app.use('/api/admin/:adminId/problemset/problems', problemRoutes);
app.use('/api/heart', heartRoutes);

app.get("/", (req, res) => {
    res.send("B for Bunny Backend API is running!");
});

app.listen(PORT, ()=>{
    console.log(`Backend Server is running on PORT:${PORT}`);
    console.log(`Node Environment is ${ENV.NODE_ENV}`);
})