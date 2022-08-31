import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Producto } from '../../producto/producto';
import { ProductoService } from '../../producto/producto.service';
import { IngresosAlmacen } from './ingresosalmacen';
import { IngresosalmacenService } from './ingresosalmacen.service';
declare var $: any;

@Component({
  selector: 'app-ingresosalmacen',
  templateUrl: './ingresosalmacen.component.html',
  styleUrls: []
})
export class IngresosalmacenComponent implements OnInit {

  ingresosalmacen: IngresosAlmacen[];
  moneda: String = "";

  a: number = 0;
  b: number = 0;
  c: number = 0;
  rootNode: any;
  idProducto: string = "";
  public chart2: any = null;
  producto:string = "";

  
  AutoComplete = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private ingresoalmacenservice: IngresosalmacenService,
    private productoService: ProductoService) { }

  ngOnInit(): void {
      this.generarChart();
      this.productosFiltrados = this.AutoComplete.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.id_producto),
        mergeMap(value => value ? this._filter(value) : [])
      );
  }

  generarChart() {
      this.chart2 = new Chart('canvas', {
          type: 'bar',
          data: {
              datasets: [
                  {
                      data: [],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.5)',
                          'rgba(54, 162, 235, 0.5)',
                          'rgba(255, 206, 86, 0.5)',
                          'rgba(75, 192, 192, 0.5)',
                          'rgba(153, 102, 255, 0.5)',
                          'rgba(255, 159, 64, 0.5)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1,
                      fill: false
                  }
              ]
          },
          options: {
              legend:{
                      display:false,
              },
              title: {
                  display: true,
                  text: 'INGRESOS POR SECTORES',
                  fontColor: '#FFFFFF'

              },
              scales: {
                  xAxes: [
                      {
                          scaleLabel: {
                              display: true,
                              labelString: 'ALMACÉN - SECTOR',
                              fontSize: 25,
                              fontColor: '#FFFFFF'
                          },
                          display: true,
                          ticks: {
                              beginAtZero: true
                          },
                      }
                  ],
                  yAxes: [
                      {
                          scaleLabel: {
                              display: true,
                              labelString: 'CANTIDAD',
                              fontSize: 25,
                              fontColor: '#FFFFFF'
                          },
                          display: true,
                          ticks: {
                              beginAtZero: true
                          }
                      }
                  ]
              }
          }
      })
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.productoService.obtenerProductosFiltrados(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  ingresosAlmacen(b, c):void{
    this.ingresoalmacenservice.filtroIngresosxAlmacen(this.idProducto, b, c).subscribe((ingresosalmacen) => {
    this.ingresosalmacen = ingresosalmacen;
    console.log(ingresosalmacen)
    this.removeData(this.chart2);
    this.addData(this.chart2, ingresosalmacen.map(ingresosalmacen => ingresosalmacen.sector), ingresosalmacen.map(ingresosalmacen => ingresosalmacen.total));
    this.limpiarCampos();
    this.idProducto = "";
    this.AutoComplete.setValue('');
  })    
  

 
}

asignarValorProducto(id:string, nombre:string):void{
  this.idProducto = id;
  this.producto = nombre;
  $(function () {
    document.getElementById("producto").innerHTML = this.producto
  });
}

limpiarCampos():void{
  $(function () {
    $("#fecha1").val('');
    $("#productos").val('');
    $("#fecha2").val('')
  });
}

  addData(chart, label: Array<any>, data2: Array<any>) {
      chart.data.labels.push(label);
      chart.config.data.datasets.forEach((dataset) => {
          dataset.data = data2
      });
      chart.config.data.labels = label
      chart.config.options.legend.labels = label
      chart.update();
  }

  removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
          dataset.data.pop();
      });
      chart.update();
  }

  onChange(moneda) {
      this.moneda = moneda;
      console.log(moneda);
  }
}
