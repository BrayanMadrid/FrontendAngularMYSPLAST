import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { DistritoService } from './components/distrito/distrito.service';
import { DepartamentoService } from './components/departamento/departamento.service';
import { CentrocostoComponent } from './components/centrocosto/centrocosto.component';
import { CentrocostoService } from './components/centrocosto/centrocosto.service';
import { UsuarioRolesComponent } from './components/usuario-roles/usuario-roles.component';
import { RolComponent } from './components/rol/rol.component';
import { RolService } from './components/rol/rol.service';
import { UsuarioRolesService } from './components/usuario-roles/usuario-roles.service';
import { UsuarioService } from './components/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from './components/form.service';
import { ActividadComponent } from './components/actividad/actividad.component';
import { FormactividadComponent } from './components/actividad/formactividad/formactividad.component';
import { ActividadService } from './components/actividad/actividad.service';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FormcategoriaComponent } from './components/categoria/formcategoria/formcategoria.component';
import { CategoriaService } from './components/categoria/categoria.service';
import { FormcentrocostoComponent } from './components/centrocosto/formcentrocosto/formcentrocosto.component';
import { MarcaComponent } from './components/marca/marca.component';
import { AlmacenComponent } from './components/almacen/almacen.component';
import { UnmedidaComponent } from './components/unmedida/unmedida.component';
import { FormmarcaComponent } from './components/marca/formmarca/formmarca.component';
import { FormalmacenComponent } from './components/almacen/formalmacen/formalmacen.component';
import { FormunmedidaComponent } from './components/unmedida/formunmedida/formunmedida.component';
import { AlmacenService } from './components/almacen/almacen.service';
import { MarcaService } from './components/marca/marca.service';
import { UnmedidaService } from './components/unmedida/unmedida.service';
import { FormproductoComponent } from './components/producto/formproducto/formproducto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FindmarcaComponent } from './components/marca/findmarca/findmarca.component';
import { JuridicaComponent } from './components/juridica/juridica.component';
import { NaturalComponent } from './components/natural/natural.component';
import { FormjuridicaComponent } from './components/juridica/formjuridica/formjuridica.component';
import { FormnaturalComponent } from './components/natural/formnatural/formnatural.component';
import { ProductoService } from './producto.service';
import { NaturalService } from './components/natural/natural.service';
import { ProvinciaService } from './components/provincia/provincia.service';
import { TipodocService } from './components/tipodoc/tipodoc.service';
import { JuridicaService } from './components/juridica/juridica.service';
import { SectorComponent } from './components/sector/sector.component';
import { FormsectorComponent } from './components/sector/formsector/formsector.component';
import { SectorService } from './components/sector/sector.service';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { ItemtransaccionComponent } from './components/itemtransaccion/itemtransaccion.component';
import { TipotransaccionComponent } from './components/tipotransaccion/tipotransaccion.component';
import { CategoriatransaccionComponent } from './components/categoriatransaccion/categoriatransaccion.component';
import { KardexComponent } from './components/reportes/kardex/kardex.component';
import { StockComponent } from './components/reportes/stock/stock.component';
import { IngresosalmacenComponent } from './components/reportes/ingresosalmacen/ingresosalmacen.component';
import { ItemordencompraComponent } from './components/itemordencompra/itemordencompra.component';
import { ItemordenprodComponent } from './components/itemordenprod/itemordenprod.component';
import { ItemrecetaprodComponent } from './components/itemrecetaprod/itemrecetaprod.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ActividadComponent,
    FormactividadComponent,
    CategoriaComponent,
    FormcategoriaComponent,
    FormcentrocostoComponent,
    CentrocostoComponent,
    UsuarioRolesComponent,
    RolComponent,
    MarcaComponent,
    AlmacenComponent,
    UnmedidaComponent,
    FormmarcaComponent,
    FormalmacenComponent,
    FormunmedidaComponent,
    ProductoComponent,
    FormproductoComponent,
    FindmarcaComponent,
    JuridicaComponent,
    NaturalComponent,
    FormjuridicaComponent,
    FormnaturalComponent,
    SectorComponent,
    FormsectorComponent,
    TransaccionComponent,
    ItemtransaccionComponent,
    TipotransaccionComponent,
    CategoriatransaccionComponent,
    KardexComponent,
    StockComponent,
    IngresosalmacenComponent,
    ItemordencompraComponent,
    ItemordenprodComponent,
    ItemrecetaprodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule,
    NgbAlertModule,
  ],
  providers: [
    AuthGuard,DistritoService,DepartamentoService,CentrocostoService,RolService,UsuarioRolesService, ProductoService, NaturalService, DistritoService,
    ProvinciaService, DepartamentoService, TipodocService, JuridicaService, SectorService,
    ActividadService, CategoriaService,UsuarioService, DatePipe, FormsService, AlmacenService, MarcaService, UnmedidaService,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
