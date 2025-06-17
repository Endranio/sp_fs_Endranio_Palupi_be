import express from 'express'
import authController from '../controllers/auth-controller'
import {authCheck} from '../middlewares/auth-middlewares'


const router = express.Router()

router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/check",authCheck,authController.check)



export default router 