import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-formpassword',
    templateUrl: './formpassword.component.html'
  })

  export class FormPasswordComponent implements OnInit {

    usuario: Usuario = new Usuario();

    constructor(private usuarioService: UsuarioService,
        private router: Router, private activatedRoute: ActivatedRoute) { }

        ngOnInit(): void {
            this.cargarProducto();
          }

          cargarProducto(): void {
            this.activatedRoute.params.subscribe(params => {
              let id = params['id']
              if(id){
                this.usuarioService.getPersona(id).subscribe((usuario)=>this.usuario = usuario)
              }
            });
          }

          

          password():void{
            this.usuarioService.updatePassword(this.usuario)
            .subscribe(usuario => {
              this.router.navigate(['/generalus/usuario']);
              swal.fire('Contraseña Actualizada', `Contraseña ${usuario.username} actualizada con éxito`, 'success')
            })
          }

  }