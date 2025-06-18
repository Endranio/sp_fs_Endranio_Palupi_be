import { Request,Response,NextFunction } from "express"
import authService from "../services/auth-service"
import { RegisterDTO } from "../dtos/dto";
import bcrypt from 'bcrypt';
import { Login, Register } from "../schemas/auth-schema";
import jwt from 'jsonwebtoken';

class AuthController {
    
async register(req:Request, res:Response, next:NextFunction){
 try {
      const body = req.body;

      const validated = await Register.validateAsync(body);
      const hashedpassword = await bcrypt.hash(validated.password, 10);
      const registerBody: RegisterDTO = {
        ...validated,
        password: hashedpassword,
      };

      const user = await authService.register(registerBody);
      res.status(200).json({
        message: 'Register success',
        data: { ...user },
      });
    } catch (error) {
      next(error);
    }

    
}

async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { email, password } = await Login.validateAsync(body);
      const user = await authService.login(email);

      if (!user) {
        res.status(404).json({
          message: 'email/password is wrong',
        });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(404).json({
          message: 'email/password is wrong',
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET || '';

      const token = jwt.sign(
        {
          id: user.id,
        },
        jwtSecret,
        {
          expiresIn: '24h',
        },
      );
      console.log(token)
      const { password: unusedpassword, ...userResponse } = user;
       res.status(200).send({
        message: 'Login success',
        data: { token, user: userResponse },
      });
    } catch (error) {
      next(error);
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = (req as any).user;
      const user = await authService.getUserById(payload.id);
  
      if (!user) {
        res.status(404).json({
          message: 'User not found',
        });
        return;
      }

      
      res.status(200).json({
        message: 'User check success',
        data: { user},
      });
    } catch (error) {
      next(error);
    }
  }

}

export default new AuthController()

