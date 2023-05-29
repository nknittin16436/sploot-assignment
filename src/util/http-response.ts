

export const successResponse = (statusCode = 200, data: any, message: string) => {
    return {
        statusCode,
        data: { data },
        message: message
    }
}
export const errorResponse = (statusCode = 400, error: any, message: string) => {
    return {
        statusCode,
        error: error,
        message: message
    }
}