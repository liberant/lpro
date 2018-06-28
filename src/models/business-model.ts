import { User } from './user-model';
import { Address } from './common-model';
import { Wine } from './wine-model';
export interface Business {
    id: string;
    type: string;
    name: string;
    website?: string;
    email?: string;
    phone?: string;
    address?: Address;
    postAddress?: Address;
    adminId: string;
    staff?: User[];
}
export interface Producer extends Business {
    region: string;
    brands: Array<string>;
    productList: Wine[];
}
export interface Retailer extends Business {
    shortList: Wine[];
    wineList: Wine[];
}