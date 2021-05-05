import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { StudentInput } from "./inputs/students.input";
import { StudentService } from "./student.service";

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => CreateStudentDto)
  createStudent(@Args('input') input: StudentInput) {
    console.log("test");
      return this.studentService.create(input);
  }

  @Query(() => Student)
  findStudent(@Args('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Query(() => [Student])
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Mutation(() => CreateStudentDto)
  updateStudent(@Args('id') id: string, @Args('input') input: StudentInput) {
      return this.studentService.update(id, input);
  }

}