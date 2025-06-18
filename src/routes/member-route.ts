import express from 'express'
import memberController from '../controllers/member-controller'


const router = express.Router()

router.get("/:projectId",memberController.getMember)
router.get("/exist/:projectId",memberController.getMemberProject)
router.post("/:projectId",memberController.addMember)
router.delete("/:userId/:projectId",memberController.deleteMember)



export default router 