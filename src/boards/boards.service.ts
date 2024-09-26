import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from '../schemas/board.schema';
import { Column } from '../schemas/column.schema';
import { Task } from '../schemas/task.schema';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const defaultColumns = ['To Do', 'In Progress', 'Done'];
    const createdColumns = await Promise.all(
      defaultColumns.map((title) =>
        this.columnModel.create({ title, tasks: [] }),
      ),
    );

    const board = await this.boardModel.create({
      ...createBoardDto,
      columns: createdColumns.map((col) => col._id),
    });

    createdColumns.forEach(async (col) => {
      col.boardID = board.id;
      await col.save();
    });

    return board.populate('columns');
  }

  async findBoardById(boardId: string): Promise<Board> {
    const board = await this.boardModel
      .findById(boardId)
      .populate({
        path: 'columns',
        populate: { path: 'tasks' },
      })
      .exec();

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  async addTaskToColumn(
    boardId: string,
    columnTitle: string,
    taskData,
  ): Promise<Board> {
    const board = await this.findBoardById(boardId);
    const column = board.columns.find((col) => col.title === columnTitle);

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const task = await this.taskModel.create({
      ...taskData,
      columnID: column._id,
    });
    column.tasks.push(task.id);
    await column.save();

    return this.findBoardById(boardId); // Return updated board
  }

  async updateTask(taskId: string, updateData): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(taskId, updateData, { new: true })
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.taskModel.findByIdAndDelete(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const column = await this.columnModel.findById(task.columnID);
    if (column) {
      column.tasks = column.tasks.filter((id) => id.toString() !== taskId);
      await column.save();
    }
  }
}
