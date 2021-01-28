import { Component, Input, OnInit } from '@angular/core';
import { MaterialModel } from 'src/app/models/Material/MaterialModel';

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent implements OnInit {
    
  showModal;
  type: string;
  material: any;

  toggleModal(type: string, object : any){
    this.showModal = !this.showModal;
    this.type = type;
    console.log(object);
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.showModal);
  }

}
