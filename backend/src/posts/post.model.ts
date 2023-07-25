import { Document } from 'mongoose';

export interface Post extends Document {
  content: string;
  createdAt: Date;
  createdBy: string;
}
