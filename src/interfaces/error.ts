export interface ErrorResponse {
    status?: number;
    data?: { error?: string; message?: string; statusCode?: number; };
}