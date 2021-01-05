import { Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from "src/app/models/User/UserModel";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements OnInit {
  
  user: UserModel;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToAccount(){
    console.log("Account");
  }

}
