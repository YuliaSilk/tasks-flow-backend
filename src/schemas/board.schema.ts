import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Column } from './column.schema';

@Schema()
export class Board extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Column' }] })
  columns: Column[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
