import { Actividad } from "../actividad/actividad";
import { Natural } from "../natural/natural";
import { Persona } from "../persona/persona";

export class Juridica extends Persona{

    razonsocial: string;
    representante: Natural;
    id_ACTIVIDAD: Actividad;

}