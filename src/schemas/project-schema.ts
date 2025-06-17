import joi from 'joi'
import { CreateProjectDTO } from '../dtos/dto'

const createProject = joi.object<CreateProjectDTO>({
    
    name:joi.string().required(),
    description:joi.string().required(),

})

export {createProject}