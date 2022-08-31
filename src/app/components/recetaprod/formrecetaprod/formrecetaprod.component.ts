import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ModalService } from '../../modal.service';
import { Producto } from '../../producto/producto';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../almacen/almacen.service';
import { SectorService } from '../../sector/sector.service';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
import { ProductoService } from '../../producto/producto.service';
import { Recetaprod } from '../recetaprod';
import { RecetaprodService } from '../recetaprod.service';
import { ItemRecetaprod } from '../../itemrecetaprod/itemrecetaprod';
declare var $: any;



@Component({
  selector: 'app-formrecetaprod',
  templateUrl: './formrecetaprod.component.html',
  styleUrls: []
})
export class FormrecetaprodComponent implements OnInit {

  recetaprod: Recetaprod = new Recetaprod();
  AutoComplete = new FormControl();
  AutoCompleteReceta = new FormControl();
  productosFiltrados: Observable<Producto[]>;
  productosFiltradosReceta: Observable<Producto[]>;
  
  constructor(private recetaprodservice: RecetaprodService, private router: Router, public modalService: ModalService, public authService: AuthService, 
    public almacenService: AlmacenService,public sectorService: SectorService, private productoService: ProductoService) { }
  
  ngOnInit(): void {
   this.productosFiltrados = this.AutoComplete.valueChanges
   .pipe(
     map(value => typeof value === 'string' ? value : value.nombre),
     mergeMap(value => value ? this._filter(value) : [])
   );

   this.productosFiltradosReceta = this.AutoCompleteReceta.valueChanges
   .pipe(
     map(value => typeof value === 'string' ? value : value.nombre),
     mergeMap(value => value ? this._filterreceta(value) : [])
   );
  }
  
  private _filterreceta(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.productoService.obtenerProductosProducciónFiltrados(filterValue);
   }

  private _filter(value: string): Observable<Producto[]> {
   const filterValue = value.toLowerCase();
   return this.productoService.obtenerProductosInsumosFiltrados(filterValue);
  }
  
  mostrarNombre(producto?: Producto): string | undefined {
   return producto ? producto.nombre : undefined;
  }

  mostrarNombreReceta(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
   }
  
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
   let producto = event.option.value as Producto;
  
   if(this.existeItem(producto.id_PRODUCTO)){
     this.incrementaCantidad(producto.id_PRODUCTO);
   } else {
   let nuevoItem = new ItemRecetaprod();
   nuevoItem.id_PRODUCTO = producto;
   this.recetaprod.items.push(nuevoItem);
   }
  
   this.AutoComplete.setValue('');
   event.option.focus();
   event.option.deselect();
  }

  seleccionarProductoReceta(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    this.recetaprod.id_PRODUCTO = producto;
    this.AutoCompleteReceta.setValue('');
    event.option.focus();
    event.option.deselect();
    $(function () {
      $("#productoreceta").val(producto.nombre);
    });
   }
  
  actualizarCantidad(id: string, event: any): void {
   let cantidad: number = event.target.value as number;
  
   if(cantidad ==0){
       return this.eliminarItemrecetaprod(id);
   }
  
   this.recetaprod.items = this.recetaprod.items.map((item: ItemRecetaprod) => {
     if (id === item.id_PRODUCTO.id_PRODUCTO) {
       item.cantidad = cantidad;
     }
     return item;
   });
  
  }
  
  existeItem(id: string): boolean {
     let existe = false;
  
     this.recetaprod.items.forEach((item: ItemRecetaprod)=>{
       if(id === item.id_PRODUCTO.id_PRODUCTO){
         existe = true;
       }
     })
     return existe;
  }

  incrementaCantidad(id: string): void {
  
   this.recetaprod.items = this.recetaprod.items.map((item: ItemRecetaprod) => {
     if (id === item.id_PRODUCTO.id_PRODUCTO) {
       ++item.cantidad;
     }
     return item;
   });
   
  }
  
  actualizarProductoReceta():void{
    $(function () {
      $("#productoreceta").val(this.recetaprod.id_PRODUCTO.nombre);
    });
   }
  
  eliminarItemrecetaprod(id: string):void{
   this.recetaprod.items = this.recetaprod.items.filter((item: ItemRecetaprod)=> id !== item.id_PRODUCTO.id_PRODUCTO);
  }
  
  create(): void{
   this.recetaprodservice.crearRecetaprod(this.recetaprod).subscribe(recetaprod=>{
     this.router.navigate(['/generalrc/recetaprod']);
     Swal.fire('Receta de Producción Registrado', `La Receta de Producción se ha registrado con Éxito!`, 'success')
   })
  }
 

}
