import { Types } from 'mongoose';

export class UserPayload {
  _id: Types.ObjectId;
  role: string;
  email: string;
  username: string;
}
