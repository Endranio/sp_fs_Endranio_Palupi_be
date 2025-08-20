import joi from 'joi'
import { LoginDTO, OauthDTO, RegisterDTO } from '../dtos/dto'


const Register = joi.object<RegisterDTO>({
    
    email:joi.string().email().required(),
    username:joi.string().required(),
    password:joi.string().min(6).required()

})

const Login = joi.object({
    
    identity:joi.string().required(),
    password:joi.string().min(6).required()

})

const Oauth = joi.object<OauthDTO>({
    
    email:joi.string().email().required(),
    username:joi.string().required(),
    provider:joi.string().required()

})
export { Login, Register,Oauth}
