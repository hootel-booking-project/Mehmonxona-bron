import { Router } from "express";

const pageRouter = Router()

pageRouter.get("/", (req, res) => {
    res.render("index", { error: null })
})

pageRouter.post("/customers/register", (req, res) =>{
    res.render("register", { error: null})
})

pageRouter.post("/customers/login", (req, res) =>{
    res.render("login", { error: null})
})

export default pageRouter;