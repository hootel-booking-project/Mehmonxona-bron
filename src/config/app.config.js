import { config } from "dotenv";

config()

const PORT=+process.env.PORT || 4000

export default PORT;