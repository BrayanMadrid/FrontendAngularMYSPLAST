import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  modal2: boolean = false;

  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  abrirModal2(){
    this.modal2 = true;
  }

  cerrarModal(){
    this.modal = false;
  }

  cerrarModal2(){
    this.modal2 = false;
  }
}
