import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  users: any = [];
  userId: string ="";

  getUsers() {
    return this.httpClient.get(`https://reqres.in/api/users?per_page=20`);
  }

  getUser(userId: string){
    return this.httpClient.get(`https://reqres.in/api/users/`+ userId);
  }

  createUsers(user: Users[]) {
    return this.httpClient.post(`https://reqres.in/api/users`, user)
  }

  deleteUser(userId: string) {
    return this.httpClient.delete(`https://reqres.in/api/users/`+ userId);
  }

  updateUser(userId: string, data: Users){
    return this.httpClient.put(`https://reqres.in/api/users`+ userId, data);
  }
}
