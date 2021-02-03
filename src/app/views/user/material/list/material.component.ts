import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModel } from 'src/app/models/Material/MaterialModel';
import Swal from 'sweetalert2';
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
  idUser: string;
  constructor(
    public MaterialService: MaterialService,
    public FormatService: FormatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')); 
    this.idUser = user.id;
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
     if(date != null)
        return this.FormatService.formatDate(date);
      else
       return "-";
  }

  goToRegister( type : string, material: MaterialModel){
    this.router.navigate(['user/material/register'],{
      queryParams:{
        backRoute: 'user/material',
        type : type,
        material : JSON.stringify(material)
      }
    });
  } 

  deleteMaterial(idMaterial: string){
    this.MaterialService.DeleteMaterial(idMaterial).subscribe(data =>{
      if(data.valid){
        Swal.fire(
          'Sucesso!',
          'Material excluído!',
          'success'
        )
        this.getAll(this.idUser);
      }
      else{
        Swal.fire(
          'Error!',
           data.message,
          'error'
        )
      }
    },ex => {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Error: ' + ex.error
      });
    });
  }
}
