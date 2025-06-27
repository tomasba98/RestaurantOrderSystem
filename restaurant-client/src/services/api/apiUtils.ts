import type { PaginationParams} from '@/types';

export default class ApiUtils {
  static handleApiError(error: any): string {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.response?.data?.errors?.length > 0) return error.response.data.errors.join(', ');
    if (error.message) return error.message;
    return 'Ha ocurrido un error inesperado';
  }

  static buildPaginationParams(
    page: number = 1,
    size: number = 10,
    sortBy?: string,
    sortDirection: 'asc' | 'desc' = 'asc'
  ): PaginationParams {
    return {
      pageNumber: page,
      pageSize: size,
      sortBy,
      sortDirection
    };
  }
}

