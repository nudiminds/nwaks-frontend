import express from "express"
import {
  createEvent,
  getUpcomingEvents,
  getPastEvents,
  getAllEvents,
  deleteEvent,
  getSingleEvent,
  updateEvent
} from "../controllers/eventController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getAllEvents)

router.get("/upcoming", getUpcomingEvents)

router.get("/past", getPastEvents)

router.post("/", authMiddleware, createEvent)

router.delete("/:id", authMiddleware, deleteEvent)

router.get("/:id", getSingleEvent)

router.put("/:id", authMiddleware, updateEvent)

export default router