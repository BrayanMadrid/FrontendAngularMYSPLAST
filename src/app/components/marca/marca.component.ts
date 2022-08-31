import { Component, OnInit } from '@angular/core';
declare var $: any;
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Marca } from './marca';
import { MarcaService } from './marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: []
})
export class MarcaComponent implements OnInit {

  marcas: Marca[];

  rootNode: any;

  marcaSeleccionada: Marca;


  constructor(private marcaService: MarcaService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.deleteTable();
    this.marcaService.obtenerMarcas().subscribe((marca) => {
      this.marcas = marca
      this.createDataTable();
    });
  }

  delete(marca: Marca): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar la marca ${marca.nom_MARCA}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.eliminarMarca(marca.id_MARCA).subscribe(
          response => {
            this.marcas = this.marcas.filter(act => act !== marca)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'La Marca ha sido eliminada',
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
      $("#marcas").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#marcas_wrapper .col-md-6:eq(0)');
    });

  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(marca: Marca) {
    this.marcaSeleccionada = marca;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.marcaSeleccionada = new Marca();
    this.modalService.abrirModal();
  }

  deleteTable() {
    $('#marcas').dataTable().fnDestroy();
  }
}
