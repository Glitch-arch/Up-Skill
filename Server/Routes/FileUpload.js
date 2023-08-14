import express from 'express'
import {cloudImageUpload, cloudVideoUpload, imageSizeReducer, localFileUpload} from "../Controllers/fileUpload.js";

const router = express.Router()

router.post('/localFileUpload', localFileUpload)
router.post('/cloudImageUpload', cloudImageUpload)
router.post('/cloudVideoUpload', cloudVideoUpload)
router.post('/imageSizeReducer', imageSizeReducer)

export default router
