import express from 'express'
import {localFileUpload} from "../Controllers/fileUpload.js";

const router = express.Router()

router.post('/localFileUpload', localFileUpload)


export default router