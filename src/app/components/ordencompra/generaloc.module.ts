import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FeahterIconModule } from './../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GeneralocComponent } from './generaloc.component';
import { FormordencompraComponent } from './formordencompra/formordencompra.component';
import { OrdencompraComponent } from './ordencompra.component';
import { FindjuridicaocComponent } from '../juridica/findjuridicaoc/findjuridicaoc.component';
import { FindnaturalocComponent } from '../natural/findnaturaloc/findnaturaloc.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralocComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'formordencompra',
        component: FormordencompraComponent
      },
      {
        path: 'ordencompra',
        component: OrdencompraComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralocComponent, FormordencompraComponent, OrdencompraComponent, 
    FindjuridicaocComponent, FindnaturalocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers:[
    DatePipe,
  ]
})
export class GeneralocModule { }
