import app from "./app.js";
import PORT from "./config/app.config.js";
import connectToMongoDb from "./config/db.config.js";

await connectToMongoDb();

let server = app.listen(PORT, () => console.log(`Server is running at port: ${PORT}✅`

));

process.on("unhandledRejection", (reason, promise) => {
    server.closeAllConnections();
    server.close(() => {
      process.exit(1);
    });
  });

process.on("uncaughtException", (err) => {
    console.log(err);
    
  process.exit(1);
});