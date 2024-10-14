import { UserType } from '../enums/UserType.enum';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: UserType;
}
