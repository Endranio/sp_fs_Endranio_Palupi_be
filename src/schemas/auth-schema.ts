import joi from 'joi'
import { LoginDTO, RegisterDTO } from '../dtos/dto'


const Register = joi.object<RegisterDTO>({
    
    email:joi.string().email().required(),
    username:joi.string().required(),
    password:joi.string().min(6).required()

})

const Login = joi.object({
    
    identity:joi.string().required(),
    password:joi.string().min(6).required()

})
export { Login,Register }
