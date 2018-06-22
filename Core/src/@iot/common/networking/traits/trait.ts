import { Request, Response, NextFunction } from "express";

export interface ITrait {
	middleware: ( request: Request, response: Response, next: NextFunction ) => void;
}