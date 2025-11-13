import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Parent from "../models/parentModel.js";
import { ENV } from "../config/env.js";

//Parent Sign-Up
export const parentSignUp = async (req, res) => {
  try{
    const {email, password} = req.body;
    const existingParent = await Parent.findOne({email});
    if (existingParent){
        return res.status(400).json({message: "Existing parent!"});
    }
    const parent = new Parent({email, password});
    await parent.save();
    res.status(201).json({message: "Parent Sign-Up successfully!"});
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

//Parent Login
export const parentLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const existingParent = await Parent.findOne({ email }).select('+password');
        if (!existingParent) {
            return res.status(404).json({ message: "No parent found!" });
        }
       
        const correctPassword = await bcrypt.compare(password, existingParent.password);
        console.log(existingParent.password);
        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid Password!" });
        }

        const token = jwt.sign({id: existingParent._id}, ENV.JWT_SECRET, { expiresIn: "1h"});
        res.json({token});
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//Parent Delete
export const parentDelete = async (req, res) => {
    try{
        const {id} = req.params;
        await Parent.findByIdAndDelete(id);
        res.status(204).json("Parent Deleted Successfully!");
    }catch(error){
        res.status(500).json({message: error.message});
    }
}