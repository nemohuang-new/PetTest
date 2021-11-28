import { IPet } from 'app/shared/model/pet.model';

export interface ICategory {
  id?: number;
  name?: string;
  pets?: IPet[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
