import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Chart, ChartConfiguration, LinearScale} from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public chart1: any = null;

  public chart2: any = null;

  ordenesCompraPendientes: number = 0;

  ordenesProdPendientes: number = 0;

  inventariosPendientes: number = 0;

  dataLocal: number[] = [];
  dataExtranjera: number[] = [];

  meses= ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre","Diciembre"];

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.obtenerPendientes();
    this.dashBoardGastosMesLocal();
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
              borderColor: '#d50000',
              backgroundColor: '#ffffff10',
              fill: false,
            },
            {
              label: 'Dolares',
              data: this.dataExtranjera,
              borderColor: '#fdd835',
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


}
