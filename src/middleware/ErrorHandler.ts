import { NextFunction, Request, Response } from "express";

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        statusCode: errStatus,
        error: err,
        message: errMsg,
    })
}

export default ErrorHandler