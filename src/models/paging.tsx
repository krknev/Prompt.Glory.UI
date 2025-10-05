export interface PagingResponse<T> {
    totalItems: number,
    totalPages: number,
    page: number,
    pageSize: number

    items: T
}

export interface PagingRequest {
    page: number,
    pageSize: number,
    order: string | null,
    filter: string | null,
    asc: boolean | null
}