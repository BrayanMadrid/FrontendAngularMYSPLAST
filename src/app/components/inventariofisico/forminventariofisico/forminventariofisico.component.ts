import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/pages/auth/login/auth.service';
import Swal from 'sweetalert2';
import { Almacen } from '../../almacen/almacen';
import { AlmacenService } from '../../almacen/almacen.service';
import { Inventariofisico } from '../../inventariofisico/inventariofisico';
import { InventariofisicoService } from '../../inventariofisico/inventariofisico.service';
import { Iteminventariofisico } from '../../iteminventariofisico/iteminventariofisico';
import { ModalService } from '../../modal.service';
import { Natural } from '../../natural/natural';
import { Producto } from '../../producto/producto';
import { ProductoService } from '../../producto/producto.service';
import { Sector } from '../../sector/sector';
import { SectorService } from '../../sector/sector.service';
declare var $: any;


@Component({
  selector: 'app-forminventariofisico',
  templateUrl: './forminventariofisico.component.html',
  styleUrls: []
})
export class ForminventariofisicoComponent implements OnInit {

  inventariofisico: Inventariofisico = new Inventariofisico();

  
  sector: Sector[];
  
  almacen: Almacen[];
  
  productosFiltrados: Producto[];
  
  naturalSeleccionada: Natural;
  
  selectedAlmacen: Almacen = { id_ALMACEN: '', nom_ALMACEN: '', estado: '',reg_USER:null,fech_REG_USER:'', fech_MOD_USER:'',mod_USER:''};
  
  AutoComplete = new FormControl();
  
    constructor(private inventariofisicoservice: InventariofisicoService, private router: Router, public modalService: ModalService, public authService: AuthService, 
      public almacenService: AlmacenService,public sectorService: SectorService, private productoService: ProductoService) { }
  
    ngOnInit(): void {
      this.cargarData();
    }
  
    cargarData(){
      this.almacenService.obtenerAlmacenes().subscribe((almacenes)=>{
        this.almacen = almacenes
      })
    }
  
    handleAlmacenChange(id: number): void {
      this.sectorService.obtenerSectoresxAlmacen(id).subscribe((sector) => this.sector = sector);
     }
  
     obtenerProductosFiltrados(sector: Sector){

      this.productoService.obtenerProductosInventarioFisico(sector.id_SECTOR).subscribe((productosFiltrados)=>{
        this.productosFiltrados = productosFiltrados;
      });
     }

     cargarDataTabla(){
      

      for(let numero of  this.productosFiltrados){
        let inventario: Iteminventariofisico  = new Iteminventariofisico();
        inventario.id_PRODUCTO = numero;
        this.inventariofisico.items.push(inventario);
      }
      this.deleteTable();
      this.createDataTable();
     }
  
     create(): void{
      this.inventariofisicoservice.crearInventarioFisico(this.inventariofisico).subscribe(inventariofisico=>{
        this.router.navigate(['/generalif/inventariofisico']);
        Swal.fire('Inventario Físico Registrado', `El Inventario Físico se ha registrado correctamente!`, 'success')
      })
     }
     
     actualizarCamposNatural():void{
      let nombre = this.inventariofisico.responsable.nombres + ' ' + this.inventariofisico.responsable.ape_PAT + ' ' + this.inventariofisico.responsable.ape_MAT;
      $(function () {
        $("#responsable").val(nombre);
      });
     }
     
      abrirModalNatural(){
        this.naturalSeleccionada = new Natural();
        this.modalService.abrirModal2();
      }
  
  
      createDataTable() {
  
        $(function () {
          $("#inventariofisico").DataTable({
            "responsive": false, "lengthChange": false, "autoWidth": false, "searching":false,
          }).buttons().container().appendTo('#inventariofisico_wrapper .col-md-6:eq(0)');
          /*    
             $('#example1').dataTable().fnClearTable();
             $('#example1').dataTable().fnDestroy(); */
    
        });
    
      }
      deleteTable() {
        $('#inventariofisico').dataTable().fnDestroy();
      }
  

}
