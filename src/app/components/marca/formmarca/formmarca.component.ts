import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../modal.service';
import { Marca } from '../marca';
import { MarcaComponent } from '../marca.component';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-formmarca',
  templateUrl: './formmarca.component.html',
  styleUrls: []
})
export class FormmarcaComponent implements OnInit {

  @Input() marca: Marca;

  constructor(private marcaservice: MarcaService, public modalservice: ModalService, private marcacom: MarcaComponent) { }

  ngOnInit(): void {

  }

  create(): void {
    this.marcaservice.crearMarca(this.marca)
      .subscribe(json => {
        Swal.fire('Nueva Marca', `${json.mensaje}: ${json.marca.nom_MARCA} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.marcaservice.actualizarMarca(this.marca)
      .subscribe(json => {
        Swal.fire('Marca Actualizada', `${json.mensaje}: ${json.marca.nom_MARCA}`, 'success')
        this.cerrarModal();
      })
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.marcacom.deleteTable();
    this.marcacom.cargarMarcas();
  }
}
