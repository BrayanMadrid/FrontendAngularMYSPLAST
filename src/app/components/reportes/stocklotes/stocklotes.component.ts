import { Component, OnInit } from '@angular/core';
import { ConsultaLotes } from './consultalotes';
import { StocklotesService } from './stocklotes.service';

@Component({
  selector: 'app-stocklotes',
  templateUrl: './stocklotes.component.html',
  styleUrls: []
})
export class StocklotesComponent implements OnInit {

  consultaLotes: ConsultaLotes[];

  constructor(private stocklotesservice: StocklotesService) { }

  ngOnInit(): void {
  }

  consultarLotes(fecha1: string, fecha2: string) {
    this.stocklotesservice.consultarLotes(fecha1, fecha2).subscribe((respuesta) => {
      this.consultaLotes = respuesta;
    })
  }

}
