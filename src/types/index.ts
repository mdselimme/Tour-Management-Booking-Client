export type { ITour } from './tour.types';
import type { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";


export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
};


export interface ISideBarItem {
    title: string,
    items: {
        title: string,
        url: string,
        component: ComponentType
    }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";