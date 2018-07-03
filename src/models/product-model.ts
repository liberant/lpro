export interface Product {
    id: string;
    pid: string;
    name: string;
    producer: string;
    brand?: string;
    vintage: Date;
    region: string;
    variety: string;
    photoURL?: string;
    cartonSize: number;
    unitCost: number;
    active: boolean;
    qty?: number;
}
