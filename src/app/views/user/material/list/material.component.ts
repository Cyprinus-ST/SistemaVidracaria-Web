import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from  '../../../../services/user/material.service';
import { FormatService } from '../../../../services/utils/format.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})

export class MaterialComponent implements OnInit {

  listMaterial;
  showModal = false;
  
  constructor(
    public MaterialService: MaterialService,
    public FormatService: FormatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')); 
    
    this.getAll(user.id);

  }

  getAll(idUser : string){
    try{
      this.MaterialService.GetAllMaterial(idUser).subscribe(data=>{
        if(data.valid)
          this.listMaterial = data.listMaterial;
      });
    }
    catch(e){

    }
  }

  dataAtualFormatada(date){
      return this.FormatService.formatDate(date);
  }

  goToRegister( type : string){
    this.router.navigate(['user/material/register'],{
      queryParams:{
        backRoute: 'user/material',
        type : type
      }
    });
  } 
}
