import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        let error = { ...err };
        error.message = err.message;
        if (err.code === 11000) {
            error = handleDuplicateKeyError();
        }
        if (err.name === "ValidationError") {
            error = handleValidationError();
        }
        if (err.name === "CastError") {
            error = handleCastError();
        }
        if (err.name === "JsonWebTokenError") {
            error = handleJWTError();
        }
        if (err.name === "TokenExpiredError") {
            error = handleJWTExpiredError();
        }
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;

const handleDuplicateKeyError = () => {
    const message = `Duplicate key error`;
    return { message, statusCode: 400 };
}
const handleValidationError = () => {
    const message = `Validation error`;
    return { message, statusCode: 400 };
}
const handleCastError = () => {
    const message = `Cast error`;
    return { message, statusCode: 400 };
}
const handleJWTError = () => {
    const message = `Invalid token`;
    return { message, statusCode: 401 };
}
const handleJWTExpiredError = () => {
    const message = `Token expired`;
    return { message, statusCode: 401 };
}   