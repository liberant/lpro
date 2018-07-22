import { Product } from './product-model';

export interface WineList {
  busId: string;
  name: string;
  wineList: Product[];
}
