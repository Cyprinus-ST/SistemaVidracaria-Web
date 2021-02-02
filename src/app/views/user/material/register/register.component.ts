import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  type: string;
  backRoute : string; 
  formGroup: FormGroup;
  error = {
    show : false,
    message: ""
  };

  constructor(    
    public activedRoute: ActivatedRoute,
    public router : Router,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {

    this.activedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.backRoute = params['backRoute'];
      console.log(this.type);
    });

  }

  initForm(){

    this.formGroup = this.fb.group({
      Name : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      ],
      Amount : [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
      ]
    }); 
  } 

  closeError(){
    this.error.show = false;
    this.error.message= "";
  }

  openError(message : string){
    this.error.show = true;
    this.error.message= message;
  }

  goBack(){
    this.router.navigate([this.backRoute]);
  }

  submit(){
    try {

    }
    catch(ex){

    }
  }
}
