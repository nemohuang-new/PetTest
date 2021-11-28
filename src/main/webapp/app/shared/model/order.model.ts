import dayjs from 'dayjs';

export interface IOrder {
  id?: number;
  petId?: number | null;
  quantity?: number | null;
  shipDate?: string | null;
  status?: string | null;
  complete?: boolean | null;
}

export const defaultValue: Readonly<IOrder> = {
  complete: false,
};
