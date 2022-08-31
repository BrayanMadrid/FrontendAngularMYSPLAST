import { Centrocosto } from "../centrocosto/centrocosto";
import { Transaccion } from "../transaccion/transaccion";

export class Egreso extends Transaccion{

 id_CENTROCOSTO: Centrocosto;
 nro_ORDEN: string;

}