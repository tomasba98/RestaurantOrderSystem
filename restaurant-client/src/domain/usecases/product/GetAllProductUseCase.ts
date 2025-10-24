// import type { IProductRepository } from '../../repositories/IProductRepository';
// import type { Product } from '../../entities/Product';
// import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

// export class GetAllProductsUseCase {
//   constructor(private productRepository: IProductRepository) {}

//   async execute(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
//     const defaultParams: PaginationParams = {
//       pageNumber: params?.pageNumber ?? 1,
//       pageSize: params?.pageSize ?? 10,
//       sortBy: params?.sortBy ?? 'name',
//       sortDirection: params?.sortDirection ?? 'asc',
//     };

    
//     if (defaultParams.pageNumber! < 1) {
//       throw new Error('El número de página debe ser mayor o igual a 1');
//     }

//     if (defaultParams.pageSize! < 1 || defaultParams.pageSize! > 100) {
//       throw new Error('El tamaño de página debe estar entre 1 y 100');
//     }

//     //return await this.productRepository.getAll(defaultParams);
//     return await this.productRepository.getAll();
//   }
// }