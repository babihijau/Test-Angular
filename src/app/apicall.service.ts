import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  user: User = new User;
  userId: string ="";

  getUsers() {
    return this.httpClient.get(`https://reqres.in/api/users?per_page=20`);
  }

  getUser(userId: string){
    return this.httpClient.get(`https://reqres.in/api/users/`+ userId);
  }

  createUsers(user: User) {
    return this.httpClient.post(`https://reqres.in/api/users`, user)
  }

  deleteUser(userId: string) {
    return this.httpClient.delete(`https://reqres.in/api/users/`+ userId);
  }

  updateUser(userId: string, data: User){
    return this.httpClient.put(`https://reqres.in/api/users`+ userId, data);
  }
}
