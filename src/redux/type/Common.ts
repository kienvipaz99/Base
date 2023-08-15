export interface ListApiResponse<T> {
  data: [];
  items: [];
  name: string;
  payload: {
    pagination: {
      total: number;
    };
  };
}
