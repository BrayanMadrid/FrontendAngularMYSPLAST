import { Distrito } from "../distrito/distrito";
import { Tipodoc } from "../tipodoc/tipodoc";

export class Persona{

    id_PERSONA: string;
    nrodoc: string;
    telefono: string;
    correo: string;
    direccion: string;
    estado: string;
    reg_USER: string;
    fech_REG_USER: string;
    mod_USER: string;
    fech_MOD_USER: string;
    id_TIPODOC: Tipodoc;
    id_DISTRITO: Distrito;
    
}