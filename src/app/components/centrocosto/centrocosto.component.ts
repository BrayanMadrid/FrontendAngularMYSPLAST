import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Centrocosto } from './centrocosto';
import { CentrocostoService } from './centrocosto.service';
declare var $: any;

@Component({
  selector: 'app-centrocosto',
  templateUrl: './centrocosto.component.html',
  styleUrls: []
})
export class CentrocostoComponent implements OnInit {

  centrocostos: Centrocosto[];

  rootNode: any;

  centrocostoSeleccionada: Centrocosto;


  constructor(private centrocostoService: CentrocostoService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarCentrocostos();
  }

  cargarCentrocostos() {
    this.centrocostoService.obtenerCentrocostos().subscribe((centrocosto) => {
      this.centrocostos = centrocosto
      this.createDataTable();
    });
  }

  delete(centrocosto: Centrocosto): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar el centro de costo ${centrocosto.nom_CENTROCOSTO}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.centrocostoService.eliminarCentrocosto(centrocosto.id_CENTROCOSTO).subscribe(
          response => {
            this.centrocostos = this.centrocostos.filter(act => act !== centrocosto)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'La Centrocosto ha sido eliminada',
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
      $("#centrocostos").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#centrocostos_wrapper .col-md-6:eq(0)');
    });

  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(centrocosto: Centrocosto) {
    this.centrocostoSeleccionada = centrocosto;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.centrocostoSeleccionada = new Centrocosto();
    this.modalService.abrirModal();
  }

  deleteTable() {
    $('#centrocostos').dataTable().fnDestroy();
  }
}
