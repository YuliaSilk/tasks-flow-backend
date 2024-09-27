// src/boards/schemas/board.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose, { Types } from 'mongoose';
import { Column } from './column.schema';

@Schema()
export class Board extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  background: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }] })
  columns: Column[];

  @Prop({ required: true })
  owner: Types.ObjectId; // If you have user authentication and want to link this to a user
}

export const BoardSchema = SchemaFactory.createForClass(Board);
