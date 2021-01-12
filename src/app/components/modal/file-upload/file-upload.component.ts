import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  
  model : boolean;

  @Input()
  set showModal(valor: boolean) {
    console.log("Oi"+ valor)
    this.model = valor;
  }

  constructor() { }
  
  ngOnInit(): void {
    
  }
  close(){
    this.model = false;
  }
}
