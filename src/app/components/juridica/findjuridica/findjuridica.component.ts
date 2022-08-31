import { Component, Input, OnInit } from '@angular/core';
import { FormingresoComponent } from '../../ingreso/formingreso/formingreso.component';
import { ModalService } from '../../modal.service';
import { Juridica } from '../juridica';
import { JuridicaService } from '../juridica.service';
declare var $: any;


@Component({
  selector: 'app-findjuridica',
  templateUrl: './findjuridica.component.html',
  styleUrls: []
})
export class FindjuridicaComponent implements OnInit {

  @Input() juridica: Juridica;

  juridicas:Juridica[];

  constructor(private juridicaService: JuridicaService,public modalservice: ModalService, private formingresocom: FormingresoComponent) { }

  ngOnInit(): void {
    this.createDataTable();
  }

  cerrarModal() {
    this.modalservice.cerrarModal();
  }

  
  filtrarJuridicas(nrodoc, razsoc):void{
    this.juridicaService.obtenerJuridicaFiltro(nrodoc, razsoc).subscribe((juridicas) => {
    this.juridicas = juridicas;
    this.deleteTable();
    this.createDataTable();
    this.limpiarCampos();
  })          
 
}

createDataTable() {

  $(function () {
    $("#findjuridicas").DataTable({
      "responsive": false, "lengthChange": false, "autoWidth": false, "searching": false
    }).buttons().container().appendTo('#findjuridicas_wrapper .col-md-6:eq(0)');
    /*    
       $('#example1').dataTable().fnClearTable();
       $('#example1').dataTable().fnDestroy(); */

  });

}

deleteTable() {
  $('#findjuridicas').dataTable().fnDestroy();
}

limpiarCampos():void{
  $(function () {
    $("#nrodoc").val('');
    $("#razsoc").val('');
  });
}

seleccionarJuridica(juridica: Juridica){
  this.juridica = juridica;
  this.formingresocom.ingreso.proveedor = juridica;
  this.formingresocom.actualizarCamposJuridica();
  this.modalservice.cerrarModal();
}

}
