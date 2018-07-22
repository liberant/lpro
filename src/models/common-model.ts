export interface Address {
  unit?: number;
  number: number;
  street: string;
  suburb: string;
  state: string;
  postCode: number;
  country?: string;
}

export interface Region {
  id?: string;
  name: string;
}

export interface Item {
  id?: string;
  name: string;
  type?: string;
}
