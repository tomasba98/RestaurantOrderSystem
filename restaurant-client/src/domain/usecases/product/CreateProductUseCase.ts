import type { CreateProductData, IProductRepository } from '../../repositories/IProductRepository';
import type { Product } from '../../entities/Product';

export class CreateProductUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(data: CreateProductData): Promise<Product>{

        if(data.price <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        if(data.name === '' || data.name === null) {
            throw new Error('El nombre no puede estar vacio');
        }
        if(data.name.length >= 100) {
            throw new Error('El nombre debe tener menos de 100 caracteres');
        }

        return await this.productRepository.create(data);
    }
}   