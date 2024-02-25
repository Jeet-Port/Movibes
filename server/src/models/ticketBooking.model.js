import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const ticketBookingSchema = new mongoose.Schema({
    mediaId: {
        type: String,
        required: true
    },
    mediaName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    showTime: {
        type: String,
        required: true
    },
    seats: {
        type: [String],
        required: true
    }
}, modelOptions);

const TicketBooking = mongoose.model("TicketBooking", ticketBookingSchema);

export default TicketBooking;
