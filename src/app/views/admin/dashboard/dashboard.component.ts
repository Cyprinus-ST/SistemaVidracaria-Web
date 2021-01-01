import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Authenticated } from '../../../models/User/UserModel';
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  constructor(
    private route : ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {

  }

}
