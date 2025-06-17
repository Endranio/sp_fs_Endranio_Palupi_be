import express from 'express'
import memberController from '../controllers/member-controller'


const router = express.Router()

router.get("/:projectId",memberController.getMember)
router.get("/exist/:id",memberController.getMemberProject)
router.delete("/:userId/projecte/:projectId",memberController.deleteMember)



export default router 