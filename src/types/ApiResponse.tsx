export interface ApiResponse<T> {
    data: T, 
    copyRight: string,
    createdDate: string,
    errors: string[],
    statusCode: number
}