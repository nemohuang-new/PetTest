import { IPet } from 'app/shared/model/pet.model';

export interface IPetInventory {
  id?: number;
  quantity?: number | null;
  petId?: IPet | null;
}

export const defaultValue: Readonly<IPetInventory> = {};
