import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FeahterIconModule } from './../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';
import { GeneralwiComponent } from './generalwi.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FindjuridicaComponent } from '../juridica/findjuridica/findjuridica.component';
import { FindnaturalComponent } from '../natural/findnatural/findnatural.component';
import { FormingresoComponent } from './formingreso/formingreso.component';
import { IngresoComponent } from './ingreso.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralwiComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'formingreso',
        component: FormingresoComponent
      },
      {
        path: 'ingreso',
        component: IngresoComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralwiComponent, FormingresoComponent, IngresoComponent, 
    FindjuridicaComponent, FindnaturalComponent],
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
export class GeneralwiModule { }
