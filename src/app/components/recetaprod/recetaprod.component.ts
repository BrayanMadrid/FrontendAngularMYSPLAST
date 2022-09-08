import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from '../producto/producto';
import { ReportsService } from '../reports.service';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
import { Recetaprod } from './recetaprod';
import { RecetaprodService } from './recetaprod.service';
import { map, mergeMap } from 'rxjs/operators';
import { ProductoService } from '../producto/producto.service';
declare var $: any;

@Component({
  selector: 'app-recetaprod',
  templateUrl: './recetaprod.component.html',
  styleUrls: []
})
export class RecetaprodComponent implements OnInit {

  recetaprod: Recetaprod = new Recetaprod();
  recetaprods: Recetaprod[];
  a: null;
  b: null;
  c: null;
  rootNode: any;

  recetaprodSeleccionado: Recetaprod;

  idProducto: string = "";

  AutoComplete = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private recetaprodservice: RecetaprodService, public modalService: ModalService, private _reportS: ReportsService,
     public authService: AuthService, private productoService: ProductoService) { }

  ngOnInit(): void {

    this.cargarRecetas();
    this.productosFiltrados = this.AutoComplete.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value.id_producto),
      mergeMap(value => value ? this._filter(value) : [])
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.productoService.obtenerProductosProducciónFiltrados(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }


  cargarRecetas() {
    this.recetaprodservice.obtenerRecetas().subscribe((mydata) => {
      this.recetaprods = mydata;
      this.createDataTable();
    })
  }

  anularRecetaprod(recetaprod: Recetaprod): void {
    Swal.fire({
      title: 'Advertencia!',
      text: "Está seguro que desea anular la Receta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, anular!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(recetaprod.estado=="N"){
            Swal.fire(
              'Error!',
              'La Receta ya se Encuentra Anulada!',
              'warning'
            )
        } else {
          this.recetaprodservice.anularRecetaprod(recetaprod).subscribe(
            response => {
              this.recetaprods = this.recetaprods.filter(oc => oc !== recetaprod)
              this.deleteTable();
              this.cargarRecetas();
              Swal.fire(
                'Anulado!',
                'Se ha anulado la Receta!',
                'success'
              )
            }
          )
        }
      }
    })
  }


  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(recetaprod: Recetaprod) {
    this.recetaprodSeleccionado = recetaprod;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.recetaprodSeleccionado = new Recetaprod();
    this.modalService.abrirModal();
  }


  createDataTable() {

    $(function () {
      $("#recetaprods").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#recetaprods_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }
  deleteTable() {
    $('#recetaprods').dataTable().fnDestroy();
  }

  filtrarKardex(nroreceta, nomreceta):void{
    this.recetaprodservice.obtenerRecetaprodFiltro(nroreceta,this.idProducto,nomreceta).subscribe((recetaprod) => {
    this.recetaprods = recetaprod;
    this.deleteTable();
    this.createDataTable();
    this.limpiarCampos();
    this.idProducto = "";
    this.AutoComplete.setValue('');
  })          
 
}

asignarValorProducto(id:string):void{
  this.idProducto = id;
}

limpiarCampos():void{
  $(function () {
    $("#almacenes").val('');
    $("#fecha1").val('');
    $("#sectores").val('');
    $("#productos").val('');
    $("#fecha2").val('')
  });
}

createPDFReceta(recetaprod: Recetaprod) {
  let doc = this._reportS.getRecetaPDF(recetaprod);
  this._reportS.openPDF(doc);
}

}
