import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { MessagePattern } from '@nestjs/microservices';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller()
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    ) {}

  @MessagePattern({ cmd: 'get-all-students' })
  findAll(): any {
    return this.studentService.findAll();
  }

  @MessagePattern({cmd: 'get-one-student-by-id'})
  findOne( id: string) {
    return this.studentService.findOne(id);
  }

  @MessagePattern({cmd: 'update-student'})
  updateStudent( data: any ) {
    return this.studentService.update(data.id, data.studentObj);
  }

  @MessagePattern({cmd: 'delete-student'})
  deleteStudent( data: any ) {
    return this.studentService.remove(data.id);
  }

  @MessagePattern({cmd: 'create-student'})
  createStudent( data: CreateStudentDto ) {
    return this.studentService.create(data);
  }


















  @Post()
  create(@Body() reqBody: Student) {
    return this.studentService.create(reqBody);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() reqBody: Student) {
    return this.studentService.update(id, reqBody);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
