import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../modal.service';
import { Centrocosto } from '../centrocosto';
import { CentrocostoComponent } from '../centrocosto.component';
import { CentrocostoService } from '../centrocosto.service';

@Component({
  selector: 'app-formcentrocosto',
  templateUrl: './formcentrocosto.component.html',
  styleUrls: []
})
export class FormcentrocostoComponent implements OnInit {

  @Input() centrocosto: Centrocosto;

  constructor(private centrocostoservice: CentrocostoService, public modalservice: ModalService, private centrocostocom: CentrocostoComponent) { }

  ngOnInit(): void {

  }

  create(): void {
    this.centrocostoservice.crearCentrocosto(this.centrocosto)
      .subscribe(json => {
        Swal.fire('Nuevo Centro de costo', `${json.mensaje}: ${json.centrocosto.nom_CENTROCOSTO} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.centrocostoservice.actualizarCentrocosto(this.centrocosto)
      .subscribe(json => {
        Swal.fire('Centro de costo Actualizado', `${json.mensaje}: ${json.centrocosto.nom_CENTROCOSTO}`, 'success')
        this.cerrarModal();
      })
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.centrocostocom.deleteTable();
    this.centrocostocom.cargarCentrocostos();
  }

}
