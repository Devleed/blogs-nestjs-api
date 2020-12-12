import { Schema, Document } from 'mongoose';

export const BlogSchema = new Schema({
  title: String,
  author: String,
  content: String,
  authorUid: String,
  date: { type: Number, default: Date.now() },
});

export interface Blog extends Document {
  _id: string;
  title: string;
  author: string;
  content: string;
  authorUid: String;
  date: number;
}
