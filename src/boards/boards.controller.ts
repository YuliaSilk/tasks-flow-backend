import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get(':id')
  getBoardById(@Param('id') id: string) {
    return this.boardsService.findBoardById(id);
  }

  @Post(':id/columns/:columnid/tasks')
  addTask(
    @Param('id') id: string,
    @Param('columnTitle') columnTitle: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.boardsService.addTaskToColumn(id, columnTitle, createTaskDto);
  }

  @Patch('tasks/:taskId')
  updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.boardsService.updateTask(taskId, updateTaskDto);
  }

  @Delete('tasks/:taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.boardsService.deleteTask(taskId);
  }
}
