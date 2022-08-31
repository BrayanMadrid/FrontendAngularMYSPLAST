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
import { GeneralopComponent } from './generalop.component';
import { FormordenprodComponent } from './formordenprod/formordenprod.component';
import { OrdenprodComponent } from './ordenprod.component';
import { NaturalopComponent } from '../natural/naturalop/naturalop.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralopComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'formordenprod',
        component: FormordenprodComponent
      },
      {
        path: 'ordenprod',
        component: OrdenprodComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralopComponent, FormordenprodComponent, OrdenprodComponent, NaturalopComponent],
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
export class GeneralopModule { }
