import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message:
            "Too many authentication attempts. Try again later.",
    },
});

export const checkoutLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message:
            "Too many checkout requests. Try again later.",
    },
});