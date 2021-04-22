import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';

const POSTGRAPHILE_URL = "http://localhost:5000/graphql";
@Injectable()
export class StudentService {
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return axios.post(POSTGRAPHILE_URL, {
      query: `query ItemQuery {
        allItems{
          nodes {
            name,
            description
          }
        }
      }`
    }).then(data => data.data.data.allItems.nodes)
      .catch(function (error) {
        response.send({
          status: '500',
          message: error
        })
      });

  }

  findOne(id: string) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `query OneItemQuery {
        item(nodeId:"${id}"){
          name,description
        }
      }`
    }).then(data => data.data.data.item)
    .catch(function (error) {
      response.send({
        status: '500',
        message: error
      })
    });
  }

  update(id: string, reqBody: any) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `mutation UpdateItem {
        updateItem(
          input:{nodeId:"${id}", 
          itemPatch:{
            name: "${reqBody.name}",
            description: "${reqBody.description}"
        }}) {
          item {
            nodeId,
            name,
            description
          }
        }
      }`
    }).then(data => data.data.data.updateItem.item)
    .catch(function (error) {
      response.send({
        status: '500',
        message: error
      })
    });
  }

  remove(id: string) {
    return axios.post(POSTGRAPHILE_URL, {
      query: `mutation RemoveItem {
        deleteItem(input:{nodeId: "${id}"}){
          deletedItemId
        }
      }`
    }).then(data => data.data.data.deleteItem)
    .catch(function (error) {
      response.send({
        status: '500',
        message: error
      })
    });
  }
}
