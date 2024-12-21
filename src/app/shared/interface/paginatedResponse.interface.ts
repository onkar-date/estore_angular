export interface PaginatedResponse<T> {
  content: Array<T>;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
