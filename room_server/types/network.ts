import { Request, Response } from "express"

export interface RoomRequest<T> extends Request {
    body: T;
}

export interface RoomResponse<T> extends Response {
    json: (body?: T) => this;
}

export type ErrorData = {
    error?: string;
}