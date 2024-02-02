export interface IPagination<T> {
    data: T[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: null | string;
        next: null | string;
    };
}