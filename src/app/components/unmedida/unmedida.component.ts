import { Component, OnInit } from '@angular/core';
declare var $: any;
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Unmedida } from './unmedida';
import { UnmedidaService } from './unmedida.service';

@Component({
  selector: 'app-unmedida',
  templateUrl: './unmedida.component.html',
  styleUrls: []
})
export class UnmedidaComponent implements OnInit {

  unmedidas: Unmedida[];

  rootNode: any;

  unmedidaSeleccionada: Unmedida;


  constructor(private unmedidaService: UnmedidaService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarUnmedidas();
  }

  cargarUnmedidas() {
    this.unmedidaService.obtenerUnmedidas().subscribe((unmedida) => {
      this.unmedidas = unmedida
      this.createDataTable();
    });
  }

  delete(unmedida: Unmedida): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar el centro de costo ${unmedida.nom_UNMEDIDA}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.unmedidaService.eliminarUnmedida(unmedida.id_UNMEDIDA).subscribe(
          response => {
            this.unmedidas = this.unmedidas.filter(act => act !== unmedida)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'La Unmedida ha sido eliminada',
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
      $("#unmedidas").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#unmedidas_wrapper .col-md-6:eq(0)');
    });

  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(unmedida: Unmedida) {
    this.unmedidaSeleccionada = unmedida;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.unmedidaSeleccionada = new Unmedida();
    this.modalService.abrirModal();
  }

  deleteTable() {
    $('#unmedidas').dataTable().fnDestroy();
  }
}
