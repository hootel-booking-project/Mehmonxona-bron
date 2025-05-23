import mongoose from "mongoose";
import { ROLES } from "../constants/role.constants.js";

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
        enum: [ROLES.VIEWER, ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN],
        default: ROLES.VIEWER
    },
    token: String,
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