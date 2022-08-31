import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../modal.service';
import { Categoria } from '../categoria';
import { CategoriaComponent } from '../categoria.component';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-formcategoria',
  templateUrl: './formcategoria.component.html',
  styleUrls: []
})
export class FormcategoriaComponent implements OnInit {

  @Input() categoria: Categoria;

  constructor(private categoriaservice: CategoriaService, public modalservice: ModalService, private categoriacom: CategoriaComponent) { }

  ngOnInit(): void {

  }

  create(): void {
    this.categoriaservice.crearCategoria(this.categoria)
      .subscribe(json => {
        Swal.fire('Nueva Categoria', `${json.mensaje}: ${json.categoria.nom_CATEGORIA} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.categoriaservice.actualizarCategoria(this.categoria)
      .subscribe(json => {
        Swal.fire('Categoria Actualizada', `${json.mensaje}: ${json.categoria.nom_CATEGORIA}`, 'success')
        this.cerrarModal();
      })
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.categoriacom.deleteTable();
    this.categoriacom.cargarCategorias();
  }

}
