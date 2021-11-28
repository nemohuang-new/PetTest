import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PhotoUrlDTO } from '../service/dto/photo-url.dto';
import { PhotoUrlMapper } from '../service/mapper/photo-url.mapper';
import { PhotoUrlRepository } from '../repository/photo-url.repository';

const relationshipNames = [];

@Injectable()
export class PhotoUrlService {
    logger = new Logger('PhotoUrlService');

    constructor(@InjectRepository(PhotoUrlRepository) private photoUrlRepository: PhotoUrlRepository) {}

    async findById(id: number): Promise<PhotoUrlDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.photoUrlRepository.findOne(id, options);
        return PhotoUrlMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<PhotoUrlDTO>): Promise<PhotoUrlDTO | undefined> {
        const result = await this.photoUrlRepository.findOne(options);
        return PhotoUrlMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<PhotoUrlDTO>): Promise<[PhotoUrlDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.photoUrlRepository.findAndCount(options);
        const photoUrlDTO: PhotoUrlDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(photoUrl => photoUrlDTO.push(PhotoUrlMapper.fromEntityToDTO(photoUrl)));
            resultList[0] = photoUrlDTO;
        }
        return resultList;
    }

    async save(photoUrlDTO: PhotoUrlDTO, creator?: string): Promise<PhotoUrlDTO | undefined> {
        const entity = PhotoUrlMapper.fromDTOtoEntity(photoUrlDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.photoUrlRepository.save(entity);
        return PhotoUrlMapper.fromEntityToDTO(result);
    }

    async update(photoUrlDTO: PhotoUrlDTO, updater?: string): Promise<PhotoUrlDTO | undefined> {
        const entity = PhotoUrlMapper.fromDTOtoEntity(photoUrlDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.photoUrlRepository.save(entity);
        return PhotoUrlMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.photoUrlRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
