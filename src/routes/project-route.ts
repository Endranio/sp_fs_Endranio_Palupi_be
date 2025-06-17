import express from 'express'
import projectController from '../controllers/project-controller'


const router = express.Router()

router.get("/:userId",projectController.getProject)
router.post("/:userId",projectController.createProject)
router.patch("/:id",projectController.updateProject)
router.delete("/:id",projectController.deleteProject)



export default router 