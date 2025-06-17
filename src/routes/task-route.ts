import express from 'express'
import taskController from '../controllers/task-controller'


const router = express.Router()

router.get("/:projectId",taskController.getTaskByProjectId)
router.post("/:projectId",taskController.createTask)
router.patch("/:id",taskController.updateTask)
router.patch("/",taskController.updateStatus)
router.delete("/:id",taskController.deleteProject)



export default router 