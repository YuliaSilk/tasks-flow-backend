// src/boards/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Column' })
  columnID: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
