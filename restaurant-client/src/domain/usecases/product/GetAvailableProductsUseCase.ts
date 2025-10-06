import type { IProductRepository } from '../../repositories/IProductRepository';
import type { Product } from '../../entities/Product';

export class GetAvailableProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.getAvailable();
  }
}