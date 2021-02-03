import { Component, OnInit } from '@angular/core';
import { FormatService } from '../../../../services/utils/format.service';
import { ProviderService } from 'src/app/services/user/provider.service';
import Swal from 'sweetalert2';
import { ProviderModel } from 'src/app/models/Provider/ProviderModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  listProvider;
  showModal = false;
  idUser: string;

  constructor(
    public ProviderService: ProviderService,
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
      this.ProviderService.GetAllProvider(idUser).subscribe(data=>{
        if(data.valid)
          this.listProvider = data.listProvider;
      });
    }
    catch(e){
    }
  }

  dataAtualFormatada(date){
      return this.FormatService.formatDate(date);
  }

  deleteProvider(idProvider: string){
    this.ProviderService.DeleteProvider(idProvider).subscribe(data =>{
      if(data.valid){
        Swal.fire(
          'Sucesso!',
          'Fornecedor excluído!',
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

  goToRegister( type : string, provider: ProviderModel){

    this.router.navigate(['user/provider/register'],{
      queryParams:{
        backRoute: 'user/provider',
        type : type,
        provider : JSON.stringify(provider)
      }
    });
  } 
}
