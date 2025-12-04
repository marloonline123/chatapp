import type { ErrorResponse, SuccessResponse } from "@/api/v1/types/respponse.js";

export const successResponse = <T>({ success = true, message, data, code = 200 }: SuccessResponse<T>) => {
    return {
        success,
        message,
        data,
        code
    };
};

export const errorResponse = ({ success = false, message, errors, code = 400 }: ErrorResponse) => {
    return {
        success,
        message,
        errors,
        code
    };
};