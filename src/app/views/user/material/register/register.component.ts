import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type: string;
  backRoute : string;

  constructor(    
    public activedRoute: ActivatedRoute,
    public router : Router,
    ) { }

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.backRoute = params['backRoute'];
      console.log(this.type);
    });
  }

  goBack(){
    this.router.navigate([this.backRoute]);
  }

}
