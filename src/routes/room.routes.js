import { Router } from "express";
import roomController from "../controllers/room.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { roomSchema } from "../schemas/room.schema.js";

const roomRouter = Router();

roomRouter
    .get("/", roomController.getAllRooms)
    .post("/", ValidationMiddleware(roomSchema), roomController.createRoom)
    .get("/:id", roomController.getRoomById)
    .put("/:id", ValidationMiddleware(roomSchema), roomController.updateRoom)
    .delete("/:id", roomController.deleteRoom);

export default roomRouter;
