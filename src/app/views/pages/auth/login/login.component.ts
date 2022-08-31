import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  titulo: String = 'Por favor inicie sesión!'; 
  usuario: Usuario;

  constructor(private authServie: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(this.authServie.isAuthenticated()){
      localStorage.setItem('isLoggedin', 'true');
      if (localStorage.getItem('isLoggedin')) {
        this.router.navigate([this.returnUrl]);
      }
      let usuario = this.authServie.usuario;
      Swal.fire('Login', `Hola ${usuario.username}, ya haz iniciado sesión anteriormente!`, 'info');
    }
  }

  onLoggedin(e) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Username o Password Vacíos!', 'error');
      return;
    }
    this.authServie.login(this.usuario).subscribe(response =>{
      console.log(response);
      this.authServie.guardarUsuario(response.access_token);
      this.authServie.guardarToken(response.access_token);
      let usuario = this.authServie.usuario;
      localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err =>{
        if(err.status == 400){
          Swal.fire('Error Login', 'Usuario y Clave incorrecta!', 'error');
        }
    }
    );
  }

}
