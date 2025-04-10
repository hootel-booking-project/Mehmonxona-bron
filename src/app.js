import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { ErrorHandlerMiddleware } from "./middleware/eror.handler.middleware.js";
import path from "node:path";
import pageRouter from "./routes/page.route.js";
import methodOverride from "method-override";
import morgan from "morgan";

const app = express();

app.use(methodOverride("_method"));

if (process.env.NODE_ENV?.trim() == "development") {
    app.use(morgan("tiny"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", pageRouter);
app.use("/", router);

app.all("/*", (_, res) => {
    res.render("notfound");
});

app.use(ErrorHandlerMiddleware);

export default app;
