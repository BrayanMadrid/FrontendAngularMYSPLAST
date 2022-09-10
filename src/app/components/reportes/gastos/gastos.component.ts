import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { OrdenCompra } from '../../ordencompra/ordencompra';
import { Gastos } from './gastos';
import { GastosService } from './gastos.service';
declare var $: any;

@Component({
    selector: 'app-gastos',
    templateUrl: './gastos.component.html',
    styleUrls: []
})
export class GastosComponent implements OnInit {

    ordencompras: OrdenCompra[];
    gastosAlmacenes: Gastos[] = [];
    moneda: String = "";

    a: number = 0;
    b: number = 0;
    c: number = 0;

    simbolo:String=""

    public chart: any = null;

    constructor(private gastosService: GastosService) { }

    ngOnInit(): void {
        this.generarChart();
    }

    generarChart() {
        this.chart = new Chart('canvas2', {
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
                    text: 'GASTOS POR ALMACÉN',
                    fontColor: '#FFFFFF'

                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'ALMACENES',
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
                                labelString: 'MONTO TOTAL' + this.simbolo,
                                fontSize: 25,
                                fontColor: '#FFFFFF'
                            },
                            display: true,
                        }
                    ]
                }
            }
        })
    }

    filtroGastos(fecha1, fecha2): void {
        this.gastosAlmacenes = [];
        this.gastosService.obtenerGastos(fecha1, fecha2, this.moneda).subscribe((ordencompras) => {
            this.ordencompras = ordencompras;

            for (let numero of this.ordencompras) {

                if (this.gastosAlmacenes == null) {
                    let gastosAlmacen: Gastos = new Gastos();
                    gastosAlmacen.subalmacen = numero.sector.id_ALMACEN.nom_ALMACEN + " - " + numero.sector.nom_SECTOR,
                        gastosAlmacen.total = numero.total
                    this.gastosAlmacenes.push(gastosAlmacen)
                } else {
                    let existe = this.gastosAlmacenes.find(gasto => gasto.subalmacen === numero.sector.id_ALMACEN.nom_ALMACEN + " - " + numero.sector.nom_SECTOR);

                    if (existe == null) {
                        let gastosAlmacen: Gastos = new Gastos();
                        gastosAlmacen.subalmacen = numero.sector.id_ALMACEN.nom_ALMACEN + " - " + numero.sector.nom_SECTOR,
                            gastosAlmacen.total = numero.total
                        this.gastosAlmacenes.push(gastosAlmacen)
                    } else {
                        let gastosAlmacen: Gastos = new Gastos();
                        let indice = this.gastosAlmacenes.indexOf(existe);
                        let total = existe.total + numero.total
                        gastosAlmacen.subalmacen = existe.subalmacen
                        gastosAlmacen.total = total
                        this.gastosAlmacenes.splice(indice, 1, gastosAlmacen);
                    }
                }



            }
            this.moneda = "";
            this.removeData(this.chart);
            this.addData(this.chart, this.gastosAlmacenes.map(gastosAlmacenes => gastosAlmacenes.subalmacen), this.gastosAlmacenes.map(gastosAlmacenes => gastosAlmacenes.total));
        })


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

    onChange(event: Event) {
        this.moneda = (event.target as HTMLInputElement).value;
        if((event.target as HTMLInputElement).value="LOCAL"){
            this.simbolo="S/. "
        }else{
            this.simbolo= "$ ";
        }

    }

}
