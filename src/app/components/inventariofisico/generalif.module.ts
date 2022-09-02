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
import { ForminventariofisicoComponent } from './forminventariofisico/forminventariofisico.component';
import { InventariofisicoComponent } from './inventariofisico.component';
import { GeneralifComponent } from './generalif.component';
import { FindnaturalifComponent } from '../natural/findnaturalif/findnaturalif.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralifComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'forminventariofisico',
        component: ForminventariofisicoComponent
      },
      {
        path: 'inventariofisico',
        component: InventariofisicoComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralifComponent, ForminventariofisicoComponent, InventariofisicoComponent, 
   FindnaturalifComponent],
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
export class GeneralifModule { }
