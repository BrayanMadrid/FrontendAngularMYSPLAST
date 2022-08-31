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
import { FormUsuariosComponent } from './formusuarios.component';
import { FormPasswordComponent } from './formpassword.component';
import { FormEditUserComponent } from './formedituser.component';
import { GeneralusComponent } from './generalus.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralusComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'usuario',
        component: UsuarioComponent
      },
      {
        path: 'formusuario',
        component: FormUsuariosComponent
      },
      {
        path: 'formedituser/:id',
        component: FormEditUserComponent
      },
      {
        path: 'formeditpassword/:id',
        component: FormPasswordComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralusComponent, FormUsuariosComponent, FormPasswordComponent, UsuarioComponent,
    FormEditUserComponent],
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
export class GeneralusModule { }
