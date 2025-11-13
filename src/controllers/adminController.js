import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from "../config/env.js";
import Admin from "../models/adminModel.js";


//add admin
export const addAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message: "Admin already exists!"});
        }

        const newAdmin = new Admin({ email, password });
        await newAdmin.save();
        res.status(201).json({ message: "Admin added successfully" });

    }catch(error){
        res.status(500).json({ message: "Server error" });
    }
}

//admin login
export const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const existingAdmin = await Admin.findOne({email}).select('+password');
        if(!existingAdmin){
            return res.status(400).json({ message: "Invalid email" });
        }
        const correctPassword = await bcrypt.compare(password, existingAdmin.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({id: existingAdmin._id}, ENV.JWT_SECRET, { expiresIn: "1h"});
        res.json({token});

    }catch(error){
        res.status(500).json({ message: error });
    }
}