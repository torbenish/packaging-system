import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateClient(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token is required",
        });
    }

    // Bearer 94334534489890-5452452348
    // [0] - Bearer
    // [1] - 94334534489890-5452452348
    const [, token] = authHeader.split(" ")

    try {

        const { sub} = verify(token, "4d28a3e21a2a021292623022a417ae00") as IPayload;

        request.id_client = sub;

        return next();

    } catch (err) {
        return response.status(401).json({
            message: "Invalid token!",
        });
    }
}
