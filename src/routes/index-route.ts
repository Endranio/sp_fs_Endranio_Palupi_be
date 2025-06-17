import  express  from "express";
import projectRouter from "./project-route"
import memberRouter from "./member-route"

const router = express.Router();

router.use("/project", projectRouter);
router.use("/member",memberRouter)


export default router;