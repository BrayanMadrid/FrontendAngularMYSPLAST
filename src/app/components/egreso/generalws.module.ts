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
import { GeneralwsComponent } from './generalws.component';
import { FormegresoComponent } from './formegreso/formegreso.component';
import { EgresoComponent } from './egreso.component';
import { FindnaturalegComponent } from '../natural/findnaturaleg/findnaturaleg.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralwsComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'formegreso',
        component: FormegresoComponent
      },
      {
        path: 'egreso',
        component: EgresoComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralwsComponent, FormegresoComponent, EgresoComponent, FindnaturalegComponent],
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
export class GeneralwsModule { }
