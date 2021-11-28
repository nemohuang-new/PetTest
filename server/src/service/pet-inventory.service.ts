import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PetInventoryDTO } from '../service/dto/pet-inventory.dto';
import { PetInventoryMapper } from '../service/mapper/pet-inventory.mapper';
import { PetInventoryRepository } from '../repository/pet-inventory.repository';

const relationshipNames = [];

@Injectable()
export class PetInventoryService {
    logger = new Logger('PetInventoryService');

    constructor(@InjectRepository(PetInventoryRepository) private petInventoryRepository: PetInventoryRepository) {}

    async findById(id: number): Promise<PetInventoryDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.petInventoryRepository.findOne(id, options);
        return PetInventoryMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<PetInventoryDTO>): Promise<PetInventoryDTO | undefined> {
        const result = await this.petInventoryRepository.findOne(options);
        return PetInventoryMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<PetInventoryDTO>): Promise<[PetInventoryDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.petInventoryRepository.findAndCount(options);
        const petInventoryDTO: PetInventoryDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(petInventory =>
                petInventoryDTO.push(PetInventoryMapper.fromEntityToDTO(petInventory)),
            );
            resultList[0] = petInventoryDTO;
        }
        return resultList;
    }

    async save(petInventoryDTO: PetInventoryDTO, creator?: string): Promise<PetInventoryDTO | undefined> {
        const entity = PetInventoryMapper.fromDTOtoEntity(petInventoryDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.petInventoryRepository.save(entity);
        return PetInventoryMapper.fromEntityToDTO(result);
    }

    async update(petInventoryDTO: PetInventoryDTO, updater?: string): Promise<PetInventoryDTO | undefined> {
        const entity = PetInventoryMapper.fromDTOtoEntity(petInventoryDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.petInventoryRepository.save(entity);
        return PetInventoryMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.petInventoryRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
