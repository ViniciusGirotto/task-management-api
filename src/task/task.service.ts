import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: CreateTaskDto[] = [];
  create(createTaskDto: CreateTaskDto) {
    this.tasks.push(createTaskDto);
    console.log(this.tasks);
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    if (task) {
      return { ...task, ...updateTaskDto };
    }else {
      throw new BadRequestException(`Task with ID ${id} not exist`);
    }
  }

  remove(id: number) {
    const task = this.tasks.findIndex((task) => task.id === id);

    if (task) {
      this.tasks = this.tasks.splice(task, 1);
      return this.tasks;
    } else {
      throw new BadRequestException(`Task with ID ${id} not found`);
    }
  }
}
