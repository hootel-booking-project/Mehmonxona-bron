import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    booking: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Booking"
    }]
},
{
    timestamps: true,
    collection: "customer",
    versionKey: false
}
)
export default mongoose.model("Customers", customerSchema)