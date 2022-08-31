import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';
import { Actividad } from '../actividad';
import { ActividadComponent } from '../actividad.component';
import { ActividadService } from '../actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formactividad',
  templateUrl: './formactividad.component.html',
  styleUrls: []
})
export class FormactividadComponent implements OnInit {

  @Input() actividad: Actividad;

  constructor(private actividadservice: ActividadService, public modalservice: ModalService, private actividadcom: ActividadComponent) { }

  ngOnInit(): void {

  }

  create(): void {
    this.actividadservice.crearActividad(this.actividad)
      .subscribe(json => {
        Swal.fire('Nueva Actividad', `${json.mensaje}: ${json.actividad.nom_ACTIVIDAD} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.actividadservice.actualizarActividad(this.actividad)
      .subscribe(json => {
        Swal.fire('Actividad Actualizada', `${json.mensaje}: ${json.actividad.nom_ACTIVIDAD}`, 'success')
        this.cerrarModal();
      })
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.actividadcom.deleteTable();
    this.actividadcom.cargarActividades();
  }

}
