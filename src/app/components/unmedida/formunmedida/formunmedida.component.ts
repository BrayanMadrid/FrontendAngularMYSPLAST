import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../modal.service';
import { Unmedida } from '../unmedida';
import { UnmedidaComponent } from '../unmedida.component';
import { UnmedidaService } from '../unmedida.service';

@Component({
  selector: 'app-formunmedida',
  templateUrl: './formunmedida.component.html',
  styleUrls: []
})
export class FormunmedidaComponent implements OnInit {

  @Input() unmedida: Unmedida;

  constructor(private unmedidaservice: UnmedidaService, public modalservice: ModalService, private unmedidacom: UnmedidaComponent) { }

  ngOnInit(): void {

  }

  create(): void {
    this.unmedidaservice.crearUnmedida(this.unmedida)
      .subscribe(json => {
        Swal.fire('Nueva Unidad de Medida', `${json.mensaje}: ${json.unmedida.nom_UNMEDIDA} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.unmedidaservice.actualizarUnmedida(this.unmedida)
      .subscribe(json => {
        Swal.fire('Centro de costo Actualizado', `${json.mensaje}: ${json.unmedida.nom_UNMEDIDA}`, 'success')
        this.cerrarModal();
      })
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.unmedidacom.deleteTable();
    this.unmedidacom.cargarUnmedidas();
  }

}
