import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create student', async () => {
    const stdArr = [{
      "id": 48,
      "name": "chamath",
      "email": "dilusha@gmail.com",
      "dob": "1995-08-25T00:00:00"
    },
    {
      "id": 49,
      "name": "rahal",
      "email": "renisha@gmail.com",
      "dob": "1996-09-25T00:00:00"
    }];
    const result = Promise.resolve(stdArr);
    jest.spyOn(studentService, 'findAll').mockImplementation(() => result);
    expect(await controller.findAll()).toBe(stdArr);
  });
});
