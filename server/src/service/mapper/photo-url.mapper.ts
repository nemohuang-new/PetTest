import { PhotoUrl } from '../../domain/photo-url.entity';
import { PhotoUrlDTO } from '../dto/photo-url.dto';

/**
 * A PhotoUrl mapper object.
 */
export class PhotoUrlMapper {
    static fromDTOtoEntity(entityDTO: PhotoUrlDTO): PhotoUrl {
        if (!entityDTO) {
            return;
        }
        const entity = new PhotoUrl();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: PhotoUrl): PhotoUrlDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new PhotoUrlDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
