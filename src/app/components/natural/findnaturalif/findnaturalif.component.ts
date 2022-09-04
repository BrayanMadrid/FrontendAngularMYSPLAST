import { Component, Input, OnInit } from '@angular/core';
import { ForminventariofisicoComponent } from '../../inventariofisico/forminventariofisico/forminventariofisico.component';
import { ModalService } from '../../modal.service';
import { Natural } from '../natural';
import { NaturalService } from '../natural.service';
declare var $: any;

@Component({
  selector: 'app-findnaturalif',
  templateUrl: './findnaturalif.component.html',
  styleUrls: []
})
export class FindnaturalifComponent implements OnInit {

  @Input() natural: Natural;

  naturales:Natural[];

  constructor(private naturalService: NaturalService,public modalservice: ModalService,
     private forminventariofisicocomponent: ForminventariofisicoComponent) { }

  ngOnInit(): void {
    this.createDataTable();
  }

  cerrarModal() {
    this.modalservice.cerrarModal2();
    this.deleteTable();
  }

  
  filtrarNaturales(nombre, nrodoc):void{
    this.naturalService.obtenerNaturalFiltro(nombre, nrodoc).subscribe((naturales) => {
    this.naturales = naturales;
    this.deleteTable();
    this.createDataTable();
    this.limpiarCampos();
  })          
 
}

createDataTable() {

  $(function () {
    $("#findnaturales").DataTable({
      "responsive": false, "lengthChange": false, "autoWidth": false, "searching": false
    }).buttons().container().appendTo('#findnaturales_wrapper .col-md-6:eq(0)');
    /*    
       $('#example1').dataTable().fnClearTable();
       $('#example1').dataTable().fnDestroy(); */

  });

}

deleteTable() {
  $('#findnaturales').dataTable().fnDestroy();
}

limpiarCampos():void{
  $(function () {
    $("#nombre").val('');
    $("#nrodoc").val('');
  });
}

seleccionarNatural(natural: Natural){
    this.deleteTable();
    this.natural = natural;
    this.forminventariofisicocomponent.inventariofisico.responsable = natural;
    this.forminventariofisicocomponent.actualizarCamposNatural();
    this.modalservice.cerrarModal2();
}

}
