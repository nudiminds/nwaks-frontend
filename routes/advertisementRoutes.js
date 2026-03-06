import express from "express"

import {
  createAdvertisement,
  getAdvertisements,
  getAllAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement
} from "../controllers/advertisementController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/",getAdvertisements)

router.get("/admin",authMiddleware,getAllAdvertisements)

router.get("/:id",getAdvertisementById)

router.post("/",authMiddleware,createAdvertisement)

router.put("/:id",authMiddleware,updateAdvertisement)

router.delete("/:id",authMiddleware,deleteAdvertisement)

export default router