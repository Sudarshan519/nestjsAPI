import {

    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Hello , World. I am inside validation middlweare');
        const { authorization } = req.headers;
        if (!authorization) {
            return res
                .status(403)
                .send({ error: 'No Authentication Token Provided' });
            // return new HttpException("No authentication Token Provided", HttpStatus.FORBIDDEN)
        }
        if (authorization === '123') {
            next();
        } else {
            return res
                .status(403)
                .send({ error: 'Invalid authentication token' });
        }

    }
}
