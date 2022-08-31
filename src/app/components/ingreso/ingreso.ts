import { Juridica } from "../juridica/juridica";
import { Transaccion } from "../transaccion/transaccion";

export class Ingreso extends Transaccion{

    nro_ORDEN: string;
    guia_REF: string;
    fecha_INGRESO:string;
    proveedor: Juridica; 

}