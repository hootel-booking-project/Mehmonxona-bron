import { config } from "dotenv";
import mongoose from "mongoose";

config()

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.mongoDb)
        console.log(`MongoDb muvvaffaqiyatli ulandi✅`);
        
    } catch (error) {
        console.log(`MongoDb ga ulanishda xatolik❌`);
        process.exit(1)
    }
}

export default connectToMongoDb;