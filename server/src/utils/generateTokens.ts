import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET as Secret;
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as Secret;

const ACCESS_TOKEN_EXPIRES = (process.env.ACCESS_TOKEN_EXPIRES ||
    '15m') as SignOptions['expiresIn'];
const REFRESH_TOKEN_EXPIRES = (process.env.REFRESH_TOKEN_EXPIRES ||
    '7d') as SignOptions['expiresIn'];


if (!ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not defined');
}

if (!REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET is not defined');
}

interface JwtPayload {
  id: string;
  role?: 'USER' | 'ADMIN';
}



export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(
        payload, 
        ACCESS_SECRET, 
        {
            expiresIn: ACCESS_TOKEN_EXPIRES,
        }
    );
};

export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(
        payload, 
        REFRESH_SECRET, 
        {
            expiresIn: REFRESH_TOKEN_EXPIRES,
        }
    );
};
