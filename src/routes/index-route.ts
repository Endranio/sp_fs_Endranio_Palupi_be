import  express  from "express";
import projectRouter from "./project-route"
import memberRouter from "./member-route"
import taskRouter from "./task-route"
import authRouter from "./auth-route"

const router = express.Router();

router.use("/project", projectRouter);
router.use("/member",memberRouter)
router.use("/task",taskRouter)
router.use("/auth",authRouter)


export default router;