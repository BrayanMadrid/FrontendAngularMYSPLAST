import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SectorService } from '../../sector/sector.service';
import { ModalService } from '../../modal.service';
import { SectorComponent } from '../sector.component';
import { Sector } from '../sector';
import { AlmacenService } from '../../almacen/almacen.service';
import { Almacen } from '../../almacen/almacen';

@Component({
  selector: 'app-formsector',
  templateUrl: './formsector.component.html',
  styleUrls: []
})
export class FormsectorComponent implements OnInit {

  @Input() sector: Sector;

  almacenes: Almacen[];

  constructor(private almacenservice: AlmacenService,  public modalservice: ModalService, private sectorcom: SectorComponent
    , private sectorservice: SectorService) { }

  ngOnInit(): void {

    this.almacenservice.obtenerAlmacenes().subscribe((almacenes)=>{
      this.almacenes = almacenes
    })

  }

  create(): void {
    this.sectorservice.crearSector(this.sector)
      .subscribe(json => {
        Swal.fire('Nuevo Sector', `${json.mensaje}: ${json.sector.nom_SECTOR} `, 'success')
        this.cerrarModal();
      })
     
  }

  update(): void {
    this.sectorservice.actualizarSector(this.sector)
      .subscribe(json => {
        Swal.fire('Sector Actualizado', `${json.mensaje}: ${json.sector.nom_SECTOR}`, 'success')
        this.cerrarModal();
      })
  }

  comprarAlmacen(o1: Almacen, o2: Almacen): boolean {
    return o1 == null || o2 == null ? false : o1.id_ALMACEN == o2.id_ALMACEN;
  }
  
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.sectorcom.deleteTable();
    this.sectorcom.cargarSectores();
  }

}
