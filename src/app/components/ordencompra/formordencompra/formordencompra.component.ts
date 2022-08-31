import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Almacen } from '../../almacen/almacen';
import { ItemOrdenCompra } from '../../itemordencompra/itemordencompra';
import { Juridica } from '../../juridica/juridica';
import { ModalService } from '../../modal.service';
import { Natural } from '../../natural/natural';
import { Producto } from '../../producto/producto';
import { OrdenCompra } from '../ordencompra';
import { OrdencompraService } from '../ordencompra.service';
import Swal from 'sweetalert2';
import { Sector } from '../../sector/sector';
import { CategoriatransaccionService } from '../../categoriatransaccion/categoriatransaccion.service';
import { AlmacenService } from '../../almacen/almacen.service';
import { SectorService } from '../../sector/sector.service';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
import { ProductoService } from '../../producto/producto.service';
declare var $: any;

@Component({
  selector: 'app-formordencompra',
  templateUrl: './formordencompra.component.html',
  styleUrls: []
})
export class FormordencompraComponent implements OnInit {
//SE INYECTA LA CLASE PERSONA

ordencompra: OrdenCompra = new OrdenCompra();

sector: Sector[];

almacen: Almacen[];

juridicaSeleccionada: Juridica;

naturalSeleccionada: Natural;

selectedAlmacen: Almacen = { id_ALMACEN: '', nom_ALMACEN: '', estado: '',reg_USER:null,fech_REG_USER:'', fech_MOD_USER:'',mod_USER:''};
AutoComplete = new FormControl();
productosFiltrados: Observable<Producto[]>;

constructor(private ordencompraservice: OrdencompraService, private router: Router, public modalService: ModalService, public authService: AuthService, 
  public almacenService: AlmacenService,public sectorService: SectorService,
  private categoriaService: CategoriatransaccionService, private productoService: ProductoService) { }

ngOnInit(): void {
 this.almacenService.obtenerAlmacenes().subscribe(almacen => this.almacen = almacen);
 this.productosFiltrados = this.AutoComplete.valueChanges
 .pipe(
   map(value => typeof value === 'string' ? value : value.nombre),
   mergeMap(value => value ? this._filter(value) : [])
 );
}

handleAlmacenChange(id: number): void {
 this.sectorService.obtenerSectoresxAlmacen(id).subscribe((sector) => this.sector = sector);
}

private _filter(value: string): Observable<Producto[]> {
 const filterValue = value.toLowerCase();
 return this.productoService.obtenerProductosFiltrados(filterValue);
}

mostrarNombre(producto?: Producto): string | undefined {
 return producto ? producto.nombre : undefined;
}

seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
 let producto = event.option.value as Producto;

 if(this.existeItem(producto.id_PRODUCTO)){
   this.incrementaCantidad(producto.id_PRODUCTO);
 } else {
 let nuevoItem = new ItemOrdenCompra();
 nuevoItem.line = this.ordencompra.items.length + 1;
 nuevoItem.id_PRODUCTO = producto;
 this.ordencompra.items.push(nuevoItem);
 }

 this.AutoComplete.setValue('');
 event.option.focus();
 event.option.deselect();
}

actualizarCantidad(id: string, event: any): void {
 let cantidad: number = event.target.value as number;

 if(cantidad ==0){
     return this.eliminarItemOrdenCompra(id);
 }

 this.ordencompra.items = this.ordencompra.items.map((item: ItemOrdenCompra) => {
   if (id === item.id_PRODUCTO.id_PRODUCTO) {
     item.cantidad = cantidad;
   }
   return item;
 });

}

existeItem(id: string): boolean {
   let existe = false;

   this.ordencompra.items.forEach((item: ItemOrdenCompra)=>{
     if(id === item.id_PRODUCTO.id_PRODUCTO){
       existe = true;
     }
   })
   return existe;
}

incrementaCantidad(id: string): void {

 this.ordencompra.items = this.ordencompra.items.map((item: ItemOrdenCompra) => {
   if (id === item.id_PRODUCTO.id_PRODUCTO) {
     ++item.cantidad;
   }
   return item;
 });
 
}

actualizarTotal(id: string, event: any): void {
 let precio: number = event.target.value as number;

 if(precio ==0){
     return this.eliminarItemOrdenCompra(id);
 }

 this.ordencompra.items = this.ordencompra.items.map((item: ItemOrdenCompra) => {
   if (id === item.id_PRODUCTO.id_PRODUCTO) {
     item.total = precio * item.cantidad;
     item.precio = precio;
   }
   return item;
 });

}

eliminarItemOrdenCompra(id: string):void{
 this.ordencompra.items = this.ordencompra.items.filter((item: ItemOrdenCompra)=> id !== item.id_PRODUCTO.id_PRODUCTO);
}

create(): void{
 let total = this.ordencompra
 this.ordencompraservice.crearOrdenCompra(this.ordencompra).subscribe(ordencompra=>{
   this.router.navigate(['/generaloc/ordencompra']);
   Swal.fire('Orden de Compra Registrado', `La Orden de Compra se ha registrado con Éxito!`, 'success')
 })
}

actualizarCamposJuridica():void{
 let nombre = this.ordencompra.proveedor.razonsocial;
 $(function () {
   $("#empresa").val(nombre);
 });
}

actualizarCamposNatural():void{
 let nombre = this.ordencompra.empleado.nombres + ' ' + this.ordencompra.empleado.ape_PAT + ' ' + this.ordencompra.empleado.ape_MAT;
 $(function () {
   $("#responsable").val(nombre);
 });
}

 //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
 abrirModalJuridica(){
   this.juridicaSeleccionada = new Juridica();
   this.modalService.abrirModal();
 }

 abrirModalNatural(){
   this.naturalSeleccionada = new Natural();
   this.modalService.abrirModal2();
 }

}
