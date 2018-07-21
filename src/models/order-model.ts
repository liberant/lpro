import { Product } from './product-model';
export interface Order {
  id: string;
  pid: string;
  producer: string;
  rid: string;
  retailer: string;
  products: Product[];
  total: number;
  orderDate: Date;
  approvedDate?: Date;
  shippedDate?: Date;
  receivedDate?: Date;
  approved: boolean;
  shipped: boolean;
  received: boolean;
  status: string;
}
