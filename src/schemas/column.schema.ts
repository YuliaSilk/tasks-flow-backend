import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from './task.schema';

@Schema()
export class Column extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardID: Types.ObjectId;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
