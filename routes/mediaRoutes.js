import express from "express"

import {
createMedia,
getMedia,
getMediaById,
updateMedia,
deleteMedia
} from "../controllers/mediaController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/",getMedia)

router.get("/:id",getMediaById)

router.post("/",authMiddleware,createMedia)

router.put("/:id",authMiddleware,updateMedia)

router.delete("/:id",authMiddleware,deleteMedia)

export default router