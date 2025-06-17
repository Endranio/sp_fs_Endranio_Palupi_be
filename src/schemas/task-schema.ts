import joi from 'joi'
import { CreateTaskDTO } from '../dtos/dto'


const createTask = joi.object<CreateTaskDTO>({
    
    title:joi.string().required(),
    description:joi.string().required(),
    assignedId:joi.string().required()

})

export {createTask}