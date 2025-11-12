import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { childSchema } from "./childModel.js";


const parentSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    children: [
        childSchema
    ],
}, { timestamps: true })

parentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

parentSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;