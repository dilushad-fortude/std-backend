import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { Transport, ClientProxyFactory, ClientOptions, ClientProxy } from '@nestjs/microservices';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentInput } from './inputs/students.input';

const options: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8877
  }
};


const POSTGRAPHILE_URL = "http://localhost:3001/graphql";
@Injectable()
export class StudentService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(options);
  }

  create(reqBody: StudentInput) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `mutation createStudent {
        createStudent(input:{student:{
            name: "${reqBody.name}", 
            email: "${reqBody.email}", 
            dob: "${reqBody.dob}"}}) {
          student{
            id, name
          }
        }
      }`
    }).then(res => res.data.data.createStudent.student)
      .catch(function (error) {
        response.send({
          status: '500',
          message: error
        })
      });
  }

  findAll() {
    return axios.post(POSTGRAPHILE_URL, {
      query: `query GetAllStudentsQuery {
        allStudents {
          nodes {
            id,name,dob,email
          }
        }
      }`
    }).then(res => res.data.data.allStudents.nodes)
      .catch(function (error) {
        response.send({
          status: '500',
          message: error
        })
      });

  }

  findOne(id: string) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `query getOneStudent {
        studentById(id:"${id}"){
          id, name, dob, email
        }
      }`
    }).then(data => data.data.data.studentById)
      .catch(function (error) {
        response.send({
          status: '500',
          message: error
        })
      });
  }

  update(id: string, reqBody: UpdateStudentDto) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `mutation updateStudent{
        updateStudentById(input:{id:"${id}", studentPatch:{
          name: "${reqBody.name}",
          email:" ${reqBody.email}",
          dob: "${reqBody.dob}"
        }}){
          student{
            id,name
          }
        }
      }`
    }).then(res => res.data.data.updateStudentById.student)
      .catch(function (error) {
        response.send({
          status: '500',
          message: error
        })
      });
  }

  remove(id: string) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `mutation removeStudent {
        deleteStudentById(input:{id:"${id}"}){
          student{
            id
          }
        }
      }`
    }).then(data => data.data.data.deleteStudentById.student)
      .catch(function (error) {
        response.send({
          status: '500',
          message: error
        })
      });
  }
}
