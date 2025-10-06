import type { IProductRepository } from '../../repositories/IProductRepository';
import type { Product } from '../../entities/Product';

export class ToggleProductAvailabilityUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.toggleAvailability(id);
  }
}