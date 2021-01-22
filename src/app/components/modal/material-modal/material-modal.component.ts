import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent implements OnInit {
    
  showModal;

  toggleModal(){
    this.showModal = !this.showModal;
    console.log(this.showModal);
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.showModal);
  }

}
