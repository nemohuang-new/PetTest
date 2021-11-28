import { PetInventory } from '../../domain/pet-inventory.entity';
import { PetInventoryDTO } from '../dto/pet-inventory.dto';

/**
 * A PetInventory mapper object.
 */
export class PetInventoryMapper {
    static fromDTOtoEntity(entityDTO: PetInventoryDTO): PetInventory {
        if (!entityDTO) {
            return;
        }
        const entity = new PetInventory();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: PetInventory): PetInventoryDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new PetInventoryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
