import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';
import { FormtransferenciaComponent } from '../../transferencia/formtransferencia/formtransferencia.component';
import { Natural } from '../natural';
import { NaturalService } from '../natural.service';
declare var $: any;

@Component({
  selector: 'app-findnaturaltr',
  templateUrl: './findnaturaltr.component.html',
  styleUrls: []
})
export class FindnaturaltrComponent implements OnInit {

  @Input() natural: Natural;

  naturales:Natural[];

  constructor(private naturalService: NaturalService,public modalservice: ModalService,
     private formtransferenciacom: FormtransferenciaComponent) { }

  ngOnInit(): void {
    this.createDataTable();
  }

  cerrarModal() {
    this.modalservice.cerrarModal2();
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
    this.natural = natural;
    this.formtransferenciacom.transferencia.id_PERSONA = natural;
    this.formtransferenciacom.actualizarCamposNatural();
    this.modalservice.cerrarModal2();
}
}
