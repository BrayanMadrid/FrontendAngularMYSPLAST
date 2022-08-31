import { Component, OnInit } from '@angular/core';
declare var $: any;
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Sector } from './sector';
import { SectorService } from './sector.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: []
})
export class SectorComponent implements OnInit {

  sectores: Sector[];

  rootNode: any;

  sectorSeleccionada: Sector;


  constructor(private sectorService: SectorService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarSectores();
  }

  cargarSectores() {
    this.sectorService.obtenerSectores().subscribe((sector) => {
      this.sectores = sector
      console.log(this.sectores)
      this.createDataTable();
    });
  }

  delete(sector: Sector): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar el centro de costo ${sector.nom_SECTOR}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.sectorService.eliminarSector(sector.id_SECTOR).subscribe(
          response => {
            this.sectores = this.sectores.filter(act => act !== sector)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'La Sector ha sido eliminada',
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
      $("#sectores").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#sectores_wrapper .col-md-6:eq(0)');
    });

  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(sector: Sector) {
    this.sectorSeleccionada = sector;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.sectorSeleccionada = new Sector();
    this.modalService.abrirModal();
  }

  deleteTable() {
    $('#sectores').dataTable().fnDestroy();
  }


}
