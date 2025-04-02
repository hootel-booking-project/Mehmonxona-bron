import express from "express"
import router from "./routes/index.js";
import { BaseException } from "./exception/base.exception.js";
import { ErrorHandlerMiddleware } from "./middleware/errr-handles.middleware.js";

const app = express()

app.use(express.json())

app.use("/api/hotel", router)

app.all("/*", (req, res) => {
  try {
    throw new BaseException(
      `Given ${req.url} with method: ${req.method} not found`,404)
  } catch (error) {
    next(error)
  }
});

app.use(ErrorHandlerMiddleware)

export default app;