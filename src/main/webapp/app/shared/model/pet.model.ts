import { IPetInventory } from 'app/shared/model/pet-inventory.model';
import { ICategory } from 'app/shared/model/category.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPet {
  id?: number;
  name?: string;
  photoUrls?: string | null;
  status?: string | null;
  additionalMetadata?: string | null;
  file?: string | null;
  inventory?: IPetInventory | null;
  category?: ICategory | null;
  tags?: ITag[] | null;
}

export const defaultValue: Readonly<IPet> = {};
