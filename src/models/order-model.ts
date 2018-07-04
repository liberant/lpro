
export interface Order {
  id: string;
  pid: string;
  producer: string;
  rid: string;
  retailer: string;
    prodId: string;
    prodName: string;
    qty: number;
    price: number;
  total: number;
  orderDate: Date;
  approvedDate?: Date;
  shippedDate?: Date;
  receivedDate?: Date;
  approved: boolean;
  shipped: boolean;
  received: boolean;
}
