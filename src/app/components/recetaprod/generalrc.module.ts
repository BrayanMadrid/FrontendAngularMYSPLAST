import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FeahterIconModule } from '../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GeneralrcComponent } from './generalrc.component';
import { FormrecetaprodComponent } from './formrecetaprod/formrecetaprod.component';
import { RecetaprodComponent } from './recetaprod.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralrcComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'formrecetaprod',
        component: FormrecetaprodComponent
      },
      {
        path: 'recetaprod',
        component: RecetaprodComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralrcComponent, FormrecetaprodComponent, RecetaprodComponent],
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
export class GeneralrcModule { }
