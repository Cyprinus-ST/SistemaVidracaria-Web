import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  
  //#region  Declarações de variáveis
    userData;
    isAdmin: boolean;
    collapseShow = "hidden";
  ////#endregion

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserData();
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  
  async getUserData(){
    this.userData = await JSON.parse(localStorage.getItem('user'));
    if(this.userData.type == "admin"){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }

  async goToAccount(){
    this.userData = await JSON.parse(localStorage.getItem('user')); 
    console.log(this.userData.id);
    this.router.navigate(['user/account'],{
      queryParams:{
        type: 'user',
        user:  this.userData.id
      }
    });
  }


}
