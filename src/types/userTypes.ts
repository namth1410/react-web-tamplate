import { Role } from "./roles";

export interface Me {
  id: string;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  role: Role;
}
