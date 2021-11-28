import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from '../web/rest/store.controller';
import { OrderRepository } from '../repository/order.repository';
import { OrderService } from '../service/order.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderRepository])],
    controllers: [StoreController],
    providers: [OrderService],
    exports: [OrderService],
})
export class StoreModule {}
