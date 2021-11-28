import { IPet } from 'app/shared/model/pet.model';

export interface ITag {
  id?: number;
  name?: string | null;
  pets?: IPet[] | null;
}

export const defaultValue: Readonly<ITag> = {};
