import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskStatusEnum } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: CreateTaskDto[] = [];
  create(createTaskDto: CreateTaskDto) {
    createTaskDto.id = uuid();
    createTaskDto.status = TaskStatusEnum.OPEN;
    this.tasks.push(createTaskDto);
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id == id);
    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    if (task) {
      return { ...task, ...updateTaskDto };
    }else {
      throw new BadRequestException(`Task with ID ${id} not exist`);
    }
  }

  remove(id: string) {
    const task = this.tasks.findIndex((task) => task.id === id);

    if (task) {
      this.tasks = this.tasks.splice(task, 1);
      return this.tasks;
    } else {
      throw new BadRequestException(`Task with ID ${id} not found`);
    }
  }
}
