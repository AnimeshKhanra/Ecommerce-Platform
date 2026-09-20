import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ZodSchema } from 'zod';


// higher order function
// const valid = () => {return () => {}}
// const valid = () => () => {}

export const validateQuery = ( schema: ZodSchema ) => {
    return (req: Request, _res:Response, next:NextFunction) => {
        const result = schema.safeParse(req.query);

        if(!result.success){
            throw new ApiError(400, 'Invalid query parameters')
        }

        // Store validated query data
        _res.locals.query = result.data;


        next();
    }

}

