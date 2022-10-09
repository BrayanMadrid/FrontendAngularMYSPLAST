import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Chart, ChartConfiguration, LinearScale} from 'chart.js'
import { TopProductosProduccion } from './topproductosproduccion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public chart1: any = null;

  public chart2: any = null;

  public chart3: any = null;

  ordenesCompraPendientes: number = 0;

  ordenesProdPendientes: number = 0;

  inventariosPendientes: number = 0;

  dataLocal: number[] = [];

  dataExtranjera: number[] = [];

  dataTopProductosEgresos: number[] = [];

  labelTopProductosEgresos: string[] = [];

  dataTopProductosIngresos: number[] = [];

  labelTopProductosIngresos: string[] = [];

  top1ProductoProduccion: TopProductosProduccion = null;

  top2ProductoProduccion: TopProductosProduccion = null;

  meses= ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre","Diciembre"];

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.obtenerPendientes();
    this.dashBoardGastosMesLocal();
    this.obtenerTopProductosEgresosIngresos();
    this.obtenerTopProductosProduccion();
  }

  dashBoardGastosMesLocal(){
    this.dashboardService.obtenerGastosMesLocal().subscribe((data) => {
      for(let mes of this.meses){
        let obtenido = data.find(element => element.mes == mes);
         if(obtenido == null){
          this.dataLocal.push(0);
         } else {
          this.dataLocal.push(Number(obtenido.total));
         }
      }

      this.dashboardService.obtenerGastosMesExtranjera().subscribe((data) => {
        for(let mes of this.meses){
          let obtenido = data.find(element => element.mes == mes);
           if(obtenido == null){
            this.dataExtranjera.push(0);
           } else {
            this.dataExtranjera.push(Number(obtenido.total));
           }
        }

      this.chart1 = new Chart('canvas1',{

        type: 'line',
        data: {
          labels: this.meses,
          datasets: [
            {
              label: 'Soles',
              data: this.dataLocal,
              borderColor: '#d5000080',
              backgroundColor: '#ffffff10',
              fill: false,
            },
            {
              label: 'Dolares',
              data: this.dataExtranjera,
              borderColor: '#fdd83580',
              backgroundColor: '#ffffff10',
              fill: false,
            }
          ]
        },
         options:{
          responsive: true,
          plugins:{
            legend:{
              position: 'top',
            },
            title:{
              display: true,
              text: 'Gráfico de Gastos Mensuales Soles',
            },
          }
         } 
      })
    });

  });
  }

  obtenerPendientes(){
    this.dashboardService.obtenerInventariosPendientes().subscribe((data)=>{
        this.inventariosPendientes = data.length;
    })
    this.dashboardService.obtenerOrdenProdPendientes().subscribe((data)=>{
      this.ordenesCompraPendientes = data.length;
    })
    this.dashboardService.obtenerOrdenProdPendientes().subscribe((data)=>{
      this.ordenesProdPendientes = data.length;
    })
  }

  obtenerTopProductosEgresosIngresos(){
    this.dashboardService.topProductosEgresos().subscribe((data)=>{
      for(let item of data){
        this.dataTopProductosEgresos.push(item.cantidad)
        this.labelTopProductosEgresos.push(item.nombre)
      }

      this.chart2 = new Chart('canvas2',{

        type: 'pie',
        data: {
          labels: this.labelTopProductosEgresos,
          datasets: [
            {
              data: this.dataTopProductosEgresos,
              borderWidth: 1,
              backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],
            }
          ]
        },
         options:{
          
        plugins:{
          legend: {
            onHover: this.handleHover,
            onLeave: this.handleLeave
          }
        }
         } 
      })

    })


    this.dashboardService.topProductosIngresos().subscribe((data)=>{
      for(let item of data){
        this.dataTopProductosIngresos.push(item.cantidad)
        this.labelTopProductosIngresos.push(item.nombre)
      }

      this.chart3 = new Chart('canvas3',{

        type: 'pie',
        data: {
          labels: this.labelTopProductosIngresos,
          datasets: [
            {
              data: this.dataTopProductosIngresos,
              borderWidth: 1,
              backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],
            }
          ]
        },
         options:{
          
        plugins:{
          legend: {
            onHover: this.handleHover,
            onLeave: this.handleLeave
          }
        }
         } 
      })

    })


  }

  handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
  }

  handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
  }

  obtenerTopProductosProduccion(){
    this.dashboardService.topProductosProduccion().subscribe((data)=>{
      for (let item of data){
        if(this.top1ProductoProduccion == null){
          this.top1ProductoProduccion = item
        } else {
          this.top2ProductoProduccion = item
        }

      }
    })
  }
}
