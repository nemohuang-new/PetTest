export interface IApiResponse {
  id?: number;
  code?: number | null;
  type?: string | null;
  message?: string | null;
}

export const defaultValue: Readonly<IApiResponse> = {};
