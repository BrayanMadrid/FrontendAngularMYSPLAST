import { Component, Input, OnInit } from '@angular/core';
import { Ingreso } from '../../ingreso/ingreso';
import { IngresoService } from '../../ingreso/ingreso.service';
import { Itemtransaccion } from '../../itemtransaccion/itemtransaccion';
import { ModalService } from '../../modal.service';
import { OrdenCompra } from '../ordencompra';
import { OrdencompraComponent } from '../ordencompra.component';
import { OrdencompraService } from '../ordencompra.service';
import Swal from 'sweetalert2';
import { CategoriatransaccionService } from '../../categoriatransaccion/categoriatransaccion.service';
import { Categoriatransaccion } from '../../categoriatransaccion/categoriatransaccion';
import { Lotes } from '../lotes';

@Component({
  selector: 'app-despachocompra',
  templateUrl: './despachocompra.component.html',
  styleUrls: []
})
export class DespachocompraComponent implements OnInit {

  @Input() ordencompra: OrdenCompra;
  categoria: Categoriatransaccion;
  docreferencia: string = "";
  lotesagregados: Array<Lotes> = [];

  
  constructor(private ordencompraservice: OrdencompraService, private ingresoservice: IngresoService, public modalservice: ModalService,
     private ordencompracom: OrdencompraComponent, private categoriaService: CategoriatransaccionService) { }

  ngOnInit(): void {
    this.categoriaService.obtenerCategoriaTransaccion(1).subscribe(categoria => this.categoria = categoria);
  }

  agregarLote(codexterno:string, event:any){
    let lote: string = event.target.value as string;
    let loteSeleccionado: Lotes = new Lotes;
    loteSeleccionado.codexterno = codexterno;
    loteSeleccionado.lote = lote;
    if(this.lotesagregados.length == 0){
      this.lotesagregados.push(loteSeleccionado);
    } else {
      let existeLote: string = "N";
      for(let item of this.lotesagregados){
        if(item.codexterno == codexterno){
          item.lote = lote
          existeLote = "S"
        } 
      }
      if(existeLote=="N"){
        this.lotesagregados.push(loteSeleccionado);
      }
    }
  }

  despachar(): void {
    let ingreso: Ingreso = new Ingreso();
    let docreferencia: string;
    docreferencia = this.docreferencia;
    ingreso.proveedor = this.ordencompra.proveedor,
    ingreso.id_PERSONA = this.ordencompra.empleado,
    ingreso.id_SECTOR = this.ordencompra.sector,
    ingreso.guia_REF = docreferencia,
    ingreso.nro_ORDEN = this.ordencompra.nroordencompra,
    ingreso.categoriatransaccion = this.categoria
    for (let numero of this.ordencompra.items) {

      let ingresoitem: Itemtransaccion = new Itemtransaccion();
      ingresoitem.cantidad = numero.cantidad,
        ingresoitem.id_PRODUCTO = numero.id_PRODUCTO,
        ingresoitem.linea = numero.line
      for (let item of this.lotesagregados){
        if(item.codexterno == ingresoitem.id_PRODUCTO.codexterno){
          ingresoitem.lote = item.lote;
        }
      }
      ingreso.items.push(ingresoitem);

    }

    let existeLote: string = "S"

    for(let items of ingreso.items){
      if (items.lote == null || items.lote == "") {
        existeLote = "N"
      }
    }

    if (docreferencia == "" || existeLote == "N") {
      Swal.fire({
        icon: 'error',
        title: "<b><h1 style='color:red'>" + 'Error, todos los campos son obligatorios!' + "</h1></b>",

      })
    } else { 
      this.ingresoservice.crearWhingreso(ingreso).subscribe(response => {})
      this.ordencompraservice.inventariarOrdenCompra(this.ordencompra).subscribe(
        response => {
          this.ordencompracom.ordencompras = this.ordencompracom.ordencompras.filter(oc => oc !== this.ordencompracom.ordencompra)
          Swal.fire(
            'Despachado!',
            'Se ha despachado la Orden de Compra!',
            'success'
          )
          this.cerrarModal();
        }

      )
      }
     
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.ordencompracom.deleteTable();
    this.ordencompracom.cargarIngresos();
  }
}
