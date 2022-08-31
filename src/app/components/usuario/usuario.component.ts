import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Rol } from '../rol/rol';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: []
})
export class UsuarioComponent implements OnInit {

  data: any;

  usuarios: Usuario[];

  rootNode: any;


  private rol: Rol;

  constructor(private usuarioService: UsuarioService, public authService: AuthService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuarioService.gerPersonas().subscribe((data) => {
      this.usuarios=data
      this.createDataTable();
    });
  }


  delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás Seguro?',
      text: `Está seguro que desea eliminar el usuario? ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(prod => prod!== usuario)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'El usuario ha sido eliminado',
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

  activarUsuario(usuario: Usuario): void {
    Swal.fire({
      title: 'Advertencia!',
      text: "Está seguro que desea activar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar!'
    }).then((result) => {
      if (result.isConfirmed) {
          usuario.enabled = true
          this.usuarioService.updateEstado(usuario).subscribe(
            response => {
              this.usuarios = this.usuarios.filter(prod => prod!== usuario)
              this.deleteTable();
              this.cargarUsuarios();
              Swal.fire(
                'Activado!',
                'Se ha activado el usuario',
                'success'
              )
            }
          )
      }
    })
  }

  inactivarUsuario(usuario: Usuario): void {
    Swal.fire({
      title: 'Advertencia!',
      text: "Está seguro que desea inactivar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, inactivar!'
    }).then((result) => {
      if (result.isConfirmed) {
          usuario.enabled = false
          this.usuarioService.updateEstado(usuario).subscribe(
            response => {
              this.usuarios = this.usuarios.filter(prod => prod!== usuario)
              this.deleteTable();
              this.cargarUsuarios();
              Swal.fire(
                'Inactivado!',
                'Se ha inactivado al usuario',
                'success'
              )
            }
          )
      }
    })
  }


    
  createDataTable() {

    $(function () {
      $("#usuarios").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#usuarios_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#usuarios').dataTable().fnDestroy();
  }

}
