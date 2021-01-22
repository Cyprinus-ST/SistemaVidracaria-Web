import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent implements OnInit {
    
  showModal;
  type: string;
  toggleModal(type? : string){
    this.showModal = !this.showModal;
    this.type = type;
    console.log(this.showModal);
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.showModal);
  }

}
