import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetInventoryController } from '../web/rest/pet-inventory.controller';
import { PetInventoryRepository } from '../repository/pet-inventory.repository';
import { PetInventoryService } from '../service/pet-inventory.service';

@Module({
    imports: [TypeOrmModule.forFeature([PetInventoryRepository])],
    controllers: [PetInventoryController],
    providers: [PetInventoryService],
    exports: [PetInventoryService],
})
export class PetInventoryModule {}
