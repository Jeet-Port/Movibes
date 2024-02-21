import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Availablemovie",
    mongoose.Schema({
        mediaId: {
            type: String,
            required: true
        },
        isAvailable: {
            type: String,
            required: true
        },
        normal: {
            type: Number,
            required: true
        },
        executive: {
            type: Number,
            required: true
        },
        premium: {
            type: Number,
            required: true
        },
    }, modelOptions)
);