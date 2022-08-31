import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
declare var $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: []
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];

  rootNode: any;

  categoriaSeleccionada: Categoria;


  constructor(private categoriaService: CategoriaService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe((categoria) => {
      this.categorias = categoria
      this.createDataTable();
    });
  }

  delete(categoria: Categoria): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar la categoria ${categoria.nom_CATEGORIA}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria.id_CATEGORIA).subscribe(
          response => {
            this.categorias = this.categorias.filter(act => act !== categoria)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'La Categoria ha sido eliminada',
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
      $("#categorias").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#categorias_wrapper .col-md-6:eq(0)');
    });

  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.categoriaSeleccionada = new Categoria();
    this.modalService.abrirModal();
  }

  deleteTable() {
    $('#categorias').dataTable().fnDestroy();
  }
}
