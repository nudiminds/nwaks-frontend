import express from "express"
import {
  createSponsor,
  getSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor
} from "../controllers/sponsorController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()


router.get("/", getSponsors)
router.get("/:id", getSponsorById)

router.post("/", authMiddleware, createSponsor)
router.put("/:id", authMiddleware, updateSponsor)
router.delete("/:id", authMiddleware, deleteSponsor)


export default router