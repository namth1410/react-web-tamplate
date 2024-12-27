import { Role } from "./roles";

export interface Me {
  id: number;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  role: Role;
}
