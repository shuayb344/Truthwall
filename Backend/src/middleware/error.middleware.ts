import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("ERROR 💥:", err);
    
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if (err.code === 11000) {
        const error = handleDuplicateKeyError();
        statusCode = error.statusCode;
        message = error.message;
    }
    if (err.name === "ValidationError") {
        const error = handleValidationError();
        statusCode = error.statusCode;
        message = error.message;
    }
    if (err.name === "CastError") {
        const error = handleCastError();
        statusCode = error.statusCode;
        message = error.message;
    }
    if (err.name === "JsonWebTokenError") {
        const error = handleJWTError();
        statusCode = error.statusCode;
        message = error.message;
    }
    if (err.name === "TokenExpiredError") {
        const error = handleJWTExpiredError();
        statusCode = error.statusCode;
        message = error.message;
    }

    res.status(statusCode).json({ 
        error: message,
        status: `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    });
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