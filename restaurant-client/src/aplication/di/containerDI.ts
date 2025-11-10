import { OrderRepositoryImpl } from '@/infrastructure/repositories/OrderRepositoryImpl';
import { TableRepositoryImpl } from '@/infrastructure/repositories/TableRepositoryImpl';
import { SessionRepositoryImpl } from '@/infrastructure/repositories/SessionRepositoryImpl';
import { CreateOrderUseCase } from '@/domain/usecases/order/CreateOrderUseCase';
import { GetOrdersByTableUseCase } from '@/domain/usecases/order/GetOrdersByTableUseCase';
import { UpdateOrderStatusUseCase } from '@/domain/usecases/order/UpdateOrderStatusUseCase';
import { CancelOrderUseCase } from '@/domain/usecases/order/CancelOrderUseCase';
import { GetKitchenQueueUseCase } from '@/domain/usecases/order/GetkitchenQueueUseCase';
import { MarkOrderReadyUseCase } from '@/domain/usecases/order/MarkOrderReadyUseCase';
import { StartSessionUseCase } from '@/domain/usecases/session/StartSessionUseCase';
import { GetActiveSessionByTableUseCase } from '@/domain/usecases/session/GetActiveSessionByTableUseCase';
import { EndSessionUseCase } from '@/domain/usecases/session/EndSessionUseCase';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/ProductRepositoryImpl';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '@/domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '@/domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '@/domain/usecases/auth/LogoutUseCase';
import { GetAllTablesUseCase } from '@/domain/usecases/table/GetAllTablesUseCase';
import { CreateTableUseCase } from '@/domain/usecases/table/CreateTableUseCase';
import { UpdateTablePositionUseCase } from '@/domain/usecases/table/UpdateTablePositionUseCase';
import { DeleteTableUseCase } from '@/domain/usecases/table/DeleteTableUseCase';
import { ToggleTableOccupationUseCase } from '@/domain/usecases/table/ToggleTableOccupationUseCase';
import { GetSessionByIdUseCase } from '@/domain/usecases/session/GetSessionByIdUseCase';
import { GetAllSessionsUseCase } from '@/domain/usecases/session/GetAllSessionUseCase';
import { CreateProductUseCase } from '@/domain/usecases/product/CreateProductUseCase';

class ContainerDI{
    private singletons = new Map<string, any>();
    private factories = new Map<string, any>();

    register<T>(key: string, factory: () => T) {
        this.factories.set(key, factory);
      }

      resolve<T>(key: string): T{
        if (!this.singletons.has(key)) {
            const factory = this.factories.get(key);

            if(!factory) throw new Error(`No factory registered for ${key}`)

            this.singletons.set(key, factory());
        }

        return this.singletons.get(key);
      }
}

export const containerDI = new ContainerDI();

// ---------- REPOSITORIES REGISTER ----------
containerDI.register("orderRepository", () => new OrderRepositoryImpl());
containerDI.register("tableRepository", () => new TableRepositoryImpl());
containerDI.register("sessionRepository", () => new SessionRepositoryImpl());
containerDI.register("productRepository", () => new ProductRepositoryImpl());
containerDI.register("authRepository", () => new AuthRepositoryImpl());

// ---------- USE CASES REGISTER ----------

// PRODUCT REGISTER
containerDI.register(
  "createProductUseCase",
  () => new CreateProductUseCase(containerDI.resolve("productRepository"))
);

// SESSION REGISTER
containerDI.register(
  "getAllSessionsUseCase",
  () => new GetAllSessionsUseCase(containerDI.resolve("sessionRepository"))
);
containerDI.register(
  "getSessionByIdUseCase",
  () => new GetSessionByIdUseCase(containerDI.resolve("sessionRepository"))
);
containerDI.register(
  "startSessionUseCase",
  () => new StartSessionUseCase(containerDI.resolve("sessionRepository"))
);
containerDI.register(
  "endSessionUseCase",
  () => new EndSessionUseCase(containerDI.resolve("sessionRepository"))
);
containerDI.register(
  "getActiveSessionByTableUseCase",
  () => new GetActiveSessionByTableUseCase(containerDI.resolve("sessionRepository"))
);

// TABLE REGISTER
containerDI.register(
  "getAllTablesUseCase",
  () => new GetAllTablesUseCase(containerDI.resolve("tableRepository"))
);
containerDI.register(
  "createTableUseCase",
  () => new CreateTableUseCase(containerDI.resolve("tableRepository"))
);
containerDI.register(
  "updateTablePositionUseCase",
  () => new UpdateTablePositionUseCase(containerDI.resolve("tableRepository"))
);
containerDI.register(
  "deleteTableUseCase",
  () => new DeleteTableUseCase(containerDI.resolve("tableRepository"))
);
containerDI.register(
  "toggleTableOccupationUseCase",
  () => new ToggleTableOccupationUseCase(containerDI.resolve("tableRepository"))
);

// AUTH REGISTER
containerDI.register(
  "loginUseCase",
  () => new LoginUseCase(containerDI.resolve("authRepository"))
);
containerDI.register(
  "registerUseCase",
  () => new RegisterUseCase(containerDI.resolve("authRepository"))
);
containerDI.register(
  "logoutUseCase",
  () => new LogoutUseCase(containerDI.resolve("authRepository"))
);

// ORDER REGISTER
containerDI.register(
  "createOrderUseCase",
  () =>
    new CreateOrderUseCase(
      containerDI.resolve("orderRepository"),
      containerDI.resolve("tableRepository")
    )
);
containerDI.register(
  "getOrdersByTableUseCase",
  () => new GetOrdersByTableUseCase(containerDI.resolve("orderRepository"))
);
containerDI.register(
  "updateOrderStatusUseCase",
  () => new UpdateOrderStatusUseCase(containerDI.resolve("orderRepository"))
);
containerDI.register(
  "cancelOrderUseCase",
  () => new CancelOrderUseCase(containerDI.resolve("orderRepository"))
);
containerDI.register(
  "getKitchenQueueUseCase",
  () => new GetKitchenQueueUseCase(containerDI.resolve("orderRepository"))
);
containerDI.register(
  "markOrderReadyUseCase",
  () => new MarkOrderReadyUseCase(containerDI.resolve("orderRepository"))
);
