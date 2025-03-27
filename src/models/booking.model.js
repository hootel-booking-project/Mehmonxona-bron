import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    roomId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Room",
        required: true
    },
    dayIn: {
        type: Date,
        required: true
    },
    dayOut: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: "booking"
})

export default mongoose.model("Booking", bookingSchema)