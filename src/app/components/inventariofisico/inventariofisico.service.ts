import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
import Swal from 'sweetalert2';
import { Inventariofisico } from './inventariofisico';
@Injectable({
  providedIn: 'root'
})
export class InventariofisicoService {

  private urlEndpoint: string = 'http://localhost:8080/inventariofisico';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  private agregarAutorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if(this.authService.isAuthenticated){
        this.authService.logout();
      }
      this.router.navigate(['/auth/login']);
      return true;
    }
    if (e.status == 403) {
      Swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username}, no tienes permiso para acceder a este recurso!`, 'warning');
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  crearInventarioFisico(inventariofisico: Inventariofisico): Observable<any> {
    return this.http.post<any>(`${this.urlEndpoint}/crear`, inventariofisico, { headers: this.agregarAutorizationHeader() }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire('Error al generar el Inventario Físico', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  obtenerInventariofisico(id): Observable<Inventariofisico> {
    return this.http.get<Inventariofisico>(`${this.urlEndpoint}/buscar/${id}`, { headers: this.agregarAutorizationHeader() }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire('Error al obtener la data del Inventario Físico', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  
  eliminarInventariofisico(id): Observable<Inventariofisico> {
    return this.http.delete<Inventariofisico>(`${this.urlEndpoint}/eliminar/${id}`, { headers: this.agregarAutorizationHeader() }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire('Error al eliminar el Inventario Físico', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  obtenerInventariofisicoFiltro(sector, fecha1, fecha2): Observable<Inventariofisico[]> {
    return this.http.get<Inventariofisico[]>(`${this.urlEndpoint}/filtro?sector=${sector}&fecha1=${fecha1}&fecha2=${fecha2}`, { headers: this.agregarAutorizationHeader() }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: "<b><h1 style='color:red'>" + 'Error!' + "</h1></b>",
          text: e.error.mensaje,

        })
        return throwError(e);
      })
    );
  }
}
