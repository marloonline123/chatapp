export interface SuccessResponse<T> {
    success?: true;
    message?: string;
    data?: T;
    code?: number;
}

export interface ErrorResponse<T> {
    success?: false;
    message?: string;
    errors?: T;
    code?: number;
}