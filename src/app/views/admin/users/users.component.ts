import { Component, OnInit } from '@angular/core';
import { FormatService } from "../../../services/utils/format.service";
import { UserService } from "../../../services/user/user.service";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  constructor(
    public UserService : UserService,
    public FormatService: FormatService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.UserService.getAll().subscribe(data =>{
      this.users = data.users;
    });
  }

  dataAtualFormatada(date){
    return this.FormatService.formatDate(date);
  }
}
