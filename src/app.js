import express from "express"
import router from "./routes/index.js";

const app = express()

app.use(express.json())

app.use("/", router)

app.all("/*", (req, res) => {
  res.status(404).send({
    message: `Given ${req.url} with method: ${req.method} not found`,
  });
});

app.use((err, req, res, next) => {
  if(err.isException){
    return res.status(err.status).send({
      message: err.message
    })
  }
  res.status(500).send({
    message: err.message,
    text:'Internal Server Error'
  })
})

export default app;