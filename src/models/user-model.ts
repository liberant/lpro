export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  busId?: string;
  busType: string;
  busName: string;
  photoURL: string;
  admin: boolean;
  active: boolean;
}
