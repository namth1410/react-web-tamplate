/**
 * Request
 */

export interface BaseApiParams {
  page?: number;
  pageSize?: number;
}

/**
 * Response
 */

export interface PaginationMetadata {
  page_size: number;
  current_page: number;
  number_of_pages: number;
  number_of_items: number;
}

export interface ResponseData<T> {
  data: T;
}

export interface PageResponseData<T> {
  data: T[];
  page: PaginationMetadata;
}
