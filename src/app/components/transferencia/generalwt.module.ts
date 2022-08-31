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
import { GeneralwtComponent } from './generalwt.component';
import { FormtransferenciaComponent } from './formtransferencia/formtransferencia.component';
import { TransferenciaComponent } from './transferencia.component';
import { FindnaturaltrComponent } from '../natural/findnaturaltr/findnaturaltr.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralwtComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'formtransferencia',
        component: FormtransferenciaComponent
      },
      {
        path: 'transferencia',
        component: TransferenciaComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralwtComponent, FormtransferenciaComponent, TransferenciaComponent, FindnaturaltrComponent],
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
export class GeneralwtModule { }
