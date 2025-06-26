import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from 'express';
import joi from "joi"

export function errorHandler(error:Error,req: Request,
    res: Response,
    next: NextFunction){

        if(error instanceof joi.ValidationError){
            res.status(400).json({
                message: error.details[0].message,
            })
            return
        }

        if(error instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).json({
                message:error.message
            })
            return
        }

        res.status(500).json({
            message:"internal server error"
        })
        console.log("errornya",error)

}