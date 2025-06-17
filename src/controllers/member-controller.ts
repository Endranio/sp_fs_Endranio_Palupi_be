import { Request,Response,NextFunction } from "express"
import memberService from "../services/member-service"

class MemberController {

    async getMember(req:Request, res:Response, next:NextFunction){
        try {
            const {projectId} = req.params
            const member = await memberService.listEligibleUsers(projectId)
            res.json(member)
        } catch (error) {
            next(error)
        }
    }

    async getMemberProject(req:Request, res:Response, next:NextFunction){
        try{
            const {id} = req.params
            const member = await memberService.getMember(id)
            res.json(member)
        }catch(error){
            next(error)
        }
    }

    async deleteMember(req:Request, res:Response, next:NextFunction){
        try {
            const {userId,projectId} = req.params
            await memberService.deleteMember(userId,projectId)
            res.json("Deleted")
        } catch (error) {
            next(error)
        }
    }
}

export default new MemberController()
