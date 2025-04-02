import app from "./app.js";
import PORT from "./config/app.config.js";
import connectToMongoDb from "./config/db.config.js";

await connectToMongoDb();

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}✅`

));