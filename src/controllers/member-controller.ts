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
            const {projectId} = req.params
            const member = await memberService.getMember(projectId)
            res.json(member)
        }catch(error){
            next(error)
        }
    }

    async addMember(req:Request, res:Response, next:NextFunction){
        try{
            const {projectId} = req.params
            const {userId} = req.body
            const member = await memberService.addMember(userId,projectId)
            res.json({data:member , message:"Member added"})
        }catch(error){
            next(error)
        }
    }

    async deleteMember(req:Request, res:Response, next:NextFunction){
        try {
            const {userId,projectId} = req.params
            await memberService.deleteMember(userId,projectId)
            res.json({message:"Deleted"})
        } catch (error) {
            next(error)
        }
    }
}

export default new MemberController()
