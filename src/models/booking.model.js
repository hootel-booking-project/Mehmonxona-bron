import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    roomId: {
        type: Number,
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
    },
    customer : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customers"
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: "booking"
})

export default mongoose.model("Booking", bookingSchema)