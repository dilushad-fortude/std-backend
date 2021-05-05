import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentService } from './student/student.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly studentService: StudentService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'hello' })
  hello(input?: string): string {
    console.log("recienved", input);
    return `Hello, ${input || 'there'}!`;
  }

  @MessagePattern({ cmd: 'add' })
  add(data: any): any {
    console.log("add");
    return 2;
  }
}
