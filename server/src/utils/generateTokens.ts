import jwt, { Secret, SignOptions } from 'jsonwebtoken';

// const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
// const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret;

const ACCESS_TOKEN_EXPIRES = (process.env.ACCESS_TOKEN_EXPIRES ||
    '15m') as SignOptions['expiresIn'];

const REFRESH_TOKEN_EXPIRES = (process.env.REFRESH_TOKEN_EXPIRES ||
    '7d') as SignOptions['expiresIn'];



export const generateAccessToken = (payload: object): string => {
    
    return jwt.sign(
        payload, 
        process.env.JWT_ACCESS_SECRET!, 
        {
            expiresIn: ACCESS_TOKEN_EXPIRES,
        }
    );
};

export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(
        payload, 
        process.env.JWT_REFRESH_SECRET!, 
        {
            expiresIn: REFRESH_TOKEN_EXPIRES,
        }
    );
};
