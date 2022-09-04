import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Almacen } from '../almacen/almacen';
import { ModalService } from '../modal.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from '../producto/producto';
import { ReportsService } from '../reports.service';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
import { Sector } from '../sector/sector';
import { SectorService } from '../sector/sector.service';
import { AlmacenService } from '../almacen/almacen.service';
import { InventariofisicoService } from './inventariofisico.service';
import { Inventariofisico } from './inventariofisico';


declare var $: any;

@Component({
  selector: 'app-inventariofisico',
  templateUrl: './inventariofisico.component.html',
  styleUrls: []
})
export class InventariofisicoComponent implements OnInit {

  inventariofisico: Inventariofisico = new Inventariofisico();
  inventariofisicos: Inventariofisico[];
  almacenes: Almacen[]
  sectores: Sector[];
  a: null;
  b: null;
  c: null;
  rootNode: any;

  inventariofisicoSeleccionado: Inventariofisico;
  selectedAlmacen: Almacen = { id_ALMACEN: '', nom_ALMACEN: '', estado: '',reg_USER:null,fech_REG_USER:'', fech_MOD_USER:'',mod_USER:''};
  selectedSector: Sector = { id_SECTOR: '', nom_SECTOR: '',  id_ALMACEN:null,fech_REG_USER:null,reg_USER:''};

  AutoComplete = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private inventariofisicoservice: InventariofisicoService, public modalService: ModalService, private _reportS: ReportsService,
     public authService: AuthService, public almacenService: AlmacenService,public sectorService: SectorService) { }

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.almacenService.obtenerAlmacenes().subscribe(almacen => this.almacenes = almacen);
  }
  handleAlmacenChange(id: string): void {
    this.sectorService.obtenerSectoresxAlmacen(id).subscribe((sector) => this.sectores = sector);
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA SELECCIONADA Y CAMBIA EL ESTADO DEL MODAL
  abrirModal(inventariofisico: Inventariofisico) {
    this.inventariofisicoSeleccionado = inventariofisico;
    this.modalService.abrirModal();
  }

  //METODO PARA ASIGNAR LOS DATOS DE LA PERSONA COMO NUEVO PARA LA CREACION DE PERSONA Y CAMBIA EL ESTADO DEL MODAL
  abrirModalNuevo() {
    this.inventariofisicoSeleccionado = new Inventariofisico();
    this.modalService.abrirModal();
  }


  createDataTable() {

    $(function () {
      $("#inventariofisicos").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#inventariofisicos_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }
  deleteTable() {
    $('#inventariofisicos').dataTable().fnDestroy();
  }

  filtrarInventariofisicos(sector, fecha1, fecha2): void {
    this.inventariofisicoservice.obtenerInventariofisicoFiltro(sector, fecha1, fecha2).subscribe((inventariofisicos) => {
      this.inventariofisicos = inventariofisicos;
      this.deleteTable();
      this.createDataTable();
      this.limpiarCampos();
    })

  }

  limpiarCampos(): void {
    $(function () {
      $("#almacenes").val('');
      $("#fecha1").val('');
      $("#sectores").val('');
      $("#fecha2").val('')
    });
  }

  /*createPDFInventariofisico(inventariofisico: Inventariofisico) {
    let doc = this._reportS.getInventariofisicoPDF(inventariofisico);
    this._reportS.openPDF(doc);
  }*/

}
