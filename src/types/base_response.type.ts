export interface BaseResponse {
    statusCode: number;
    message: string;
    success: boolean;
}

export interface DataResponse<T> extends BaseResponse {
    data: T;
}

export interface PaginationResponse<T> extends BaseResponse {
    data: T;
    pagination: BasePagination
}

export type BasePagination = {
    totalItems: number;
    totalPages: number;
    pageIndex: number;
    pageSize: number;
}
