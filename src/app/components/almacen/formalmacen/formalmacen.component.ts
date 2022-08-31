import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';
import { Almacen } from '../almacen';
import { AlmacenComponent } from '../almacen.component';
import { AlmacenService } from '../almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formalmacen',
  templateUrl: './formalmacen.component.html',
  styleUrls: []
})
export class FormalmacenComponent implements OnInit {

  @Input() almacen: Almacen;

  constructor(private almaceneservice: AlmacenService,  public modalservice: ModalService, private almacencom: AlmacenComponent) { }

  ngOnInit(): void {

  }

  create(): void {
    this.almaceneservice.crearAlmacen(this.almacen)
      .subscribe(json => {
        Swal.fire('Nuevo Almacén', `${json.mensaje}: ${json.almacen.nom_ALMACEN} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.almaceneservice.actualizarAlmacen(this.almacen)
      .subscribe(json => {
        Swal.fire('Almacen Actualizado', `${json.mensaje}: ${json.almacen.nom_ALMACEN}`, 'success')
        this.cerrarModal();
      })
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.almacencom.deleteTable();
    this.almacencom.cargarAlmacenes();
  }
}
