import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() {

  }


  campoNoValido(campo: string, form: FormGroup, formSubmited: boolean): boolean {
    if (form.get(campo)?.invalid && formSubmited) {
      return true;
    } else {
      return false;
    }
  }
}
