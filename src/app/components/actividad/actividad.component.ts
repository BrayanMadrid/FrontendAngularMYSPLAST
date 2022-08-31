import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Actividad } from './actividad';
import { ActividadService } from './actividad.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: []
})
export class ActividadComponent implements OnInit {

  actividades: Actividad[];

  rootNode: any;

  actividadSeleccionada: Actividad;


  constructor(private actividadService: ActividadService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    this.actividadService.obtenerActividades().subscribe((actividad) => {
      this.actividades = actividad
      this.createDataTable();
    });
  }

  delete(actividad: Actividad): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar la actividad ${actividad.nom_ACTIVIDAD}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.eliminarActividad(actividad.id_ACTIVIDAD).subscribe(
          response => {
            this.actividades = this.actividades.filter(act => act !== actividad)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'La Actividad ha sido eliminada',
              'success'
            )
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se ha cancelado la operación',
          'error'
        )
      }
    })
  }

  createDataTable() {

    $(function () {
      $("#actividades").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#actividades_wrapper .col-md-6:eq(0)');
    });

  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(actividad: Actividad) {
    this.actividadSeleccionada = actividad;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.actividadSeleccionada = new Actividad();
    this.modalService.abrirModal();
  }

  deleteTable() {
    $('#actividades').dataTable().fnDestroy();
  }

}
