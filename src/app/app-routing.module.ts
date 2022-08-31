import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CentrocostoComponent } from './components/centrocosto/centrocosto.component';
import { AlmacenComponent } from './components/almacen/almacen.component';
import { UnmedidaComponent } from './components/unmedida/unmedida.component';
import { MarcaComponent } from './components/marca/marca.component';
import { ProductoComponent } from './components/producto/producto.component';
import { NaturalComponent } from './components/natural/natural.component';
import { JuridicaComponent } from './components/juridica/juridica.component';
import { SectorComponent } from './components/sector/sector.component';
import { KardexComponent } from './components/reportes/kardex/kardex.component';
import { StockComponent } from './components/reportes/stock/stock.component';
import { IngresosalmacenComponent } from './components/reportes/ingresosalmacen/ingresosalmacen.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
          
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'centrocosto', component: CentrocostoComponent},
      { path: 'actividad', component: ActividadComponent},
      { path: 'categoria', component: CategoriaComponent},
      { path: 'almacen', component: AlmacenComponent},
      { path: 'unmedida', component: UnmedidaComponent},
      { path: 'marca', component: MarcaComponent},
      { path: 'producto', component: ProductoComponent},
      { path: 'natural', component: NaturalComponent},
      { path: 'juridica', component: JuridicaComponent},
      { path: 'sector', component: SectorComponent},
      { path: 'kardex', component: KardexComponent},
      { path: 'stock', component: StockComponent},
      { path: 'ingresosalmacen', component: IngresosalmacenComponent},
      {
        path: 'generalwi',
        loadChildren: () => import('./components/ingreso/generalwi.module').then(m => m.GeneralwiModule)
      },
      {
        path: 'generalws',
        loadChildren: () => import('./components/egreso/generalws.module').then(m => m.GeneralwsModule)
      },
      {
        path: 'generalwt',
        loadChildren: () => import('./components/transferencia/generalwt.module').then(m => m.GeneralwtModule)
      },
      {
        path: 'generalus',
        loadChildren: () => import('./components/usuario/generalus.module').then(m => m.GeneralusModule)
      }, {
        path: 'generaloc',
        loadChildren: () => import('./components/ordencompra/generaloc.module').then(m => m.GeneralocModule)
      },
      {
        path: 'generalop',
        loadChildren: () => import('./components/ordenprod/generalop.module').then(m => m.GeneralopModule)
      },
      {
        path: 'generalrc',
        loadChildren: () => import('./components/recetaprod/generalrc.module').then(m => m.GeneralrcModule)
      },
      /*{ path: 'juridica', component: JuridicaComponent},
      { path: 'natural', component: NaturalComponent},
      { path: 'producto', component: ProductoComponent},
      { path: 'familia', component: FamiliaComponent},
      { path: 'almacen', component: AlmacenComponent},
      { path: 'marca', component: MarcaComponent},
      { path: 'unmedida', component: UnmedidaComponent},
      { path: 'subalmacen', component: SubalmacenComponent},
      { path: 'gastos', component: GastosComponent},
      { path: 'dashboard', component: DashboardComponent},*/
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
