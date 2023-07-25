import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String},
});
