import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApicallService } from './apicall.service';
import { Users } from './users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReqresApiTesting';
  users: Users[] = [];
  tempUsers: Users[] = [];
  user: any = {};
  searchId: string = "";
  delId: string = "";
  updateId: string = "";
  updateUserData: Users = new Users;


  constructor(public http: HttpClient, private apiService: ApicallService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    if (this.users.length == 0) {
      this.apiService
        .getUsers()
        .subscribe((data: any) => {
          console.log(data);
          this.users = data.data;
          this.updateTempUsers();
        });
    } else {
      this.showList();
    }
  }

  getUser() {
    if (this.users.find(value => value.id == parseInt(this.searchId))) {

      this.apiService.getUser(this.searchId).subscribe((res: any) => {
        console.log("bruv wat u searchin", res)
        // to simulate search (?)   
        this.users = this.users.filter(value => value.id == parseInt(res.data.id));
      });
    }
  }

  createUser() {
    this.apiService.createUsers(this.user).subscribe((res: any) => {
      console.log("bruv wat u creatin", res);
      // to simulate create user (?)
      res.id = parseInt(res.id);
      this.users.push(res);
      this.updateTempUsers();
    });
  }

  deleteUser() {
    this.apiService.deleteUser(this.delId).subscribe((res) => {
      console.log("bruv wat u deletin", res);
      // to simulate delete (?)
      this.users = this.users.filter(value => value.id !== parseInt(this.delId));
      this.updateTempUsers();
    });
  }

  updateUser() {
    this.apiService.updateUser(this.updateId, this.updateUserData).subscribe((res) => {
      console.log("bruv wat u updatin", res);
      let found = this.users.find(value => value.id == parseInt(this.updateId));
      if (found) {
        found.first_name = this.updateUserData.first_name;
        found.last_name = this.updateUserData.last_name;
        found.email = this.updateUserData.email;
      }
      this.updateTempUsers();
    });
  }

  updateTempUsers() {
    this.tempUsers = [...this.users];
  }

  showList() {
    this.users = [...this.tempUsers];
  }
}
