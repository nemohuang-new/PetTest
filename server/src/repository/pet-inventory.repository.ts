import { EntityRepository, Repository } from 'typeorm';
import { PetInventory } from '../domain/pet-inventory.entity';

@EntityRepository(PetInventory)
export class PetInventoryRepository extends Repository<PetInventory> {}
