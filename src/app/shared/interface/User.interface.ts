import { UserType } from '../enums/UserType.enum';

export interface User {
  token: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  role: UserType;
}
