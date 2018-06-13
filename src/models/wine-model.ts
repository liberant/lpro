export interface Wine {
    id: string;
    pid: string;
    name: string;
    brand?: string;
    vintage: Date;
    region: string;
    variety: string;
    cartonSize: number;
    unitCost: number;
    active: boolean;
}