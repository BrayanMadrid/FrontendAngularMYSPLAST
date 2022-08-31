import { ItemOrdenCompra } from "../itemordencompra/itemordencompra";
import { Juridica } from "../juridica/juridica";
import { Natural } from "../natural/natural";
import { Sector } from "../sector/sector";
import { Tipotransaccion } from "../tipotransaccion/tipotransaccion";

export class OrdenCompra{
    id_ORDENCOMPRA:string;
    fecha:Date;
    nro_ORDENCOMPRA:string;
    id_TIPOTRANSACCION:Tipotransaccion;
    empleado:Natural;
    sector:Sector;
    proveedor:Juridica;
    moneda: string;
    tipopago:string;
    subtotal:number;
    igv:number;
    total:number;
    estado:string;
    desc_ORDENCOMPRA:string;
    reg_USER: string;
    fech_REG_USER: string;
    mod_USER: string;
    fech_MOD_USER: string;
    items: Array<ItemOrdenCompra> = [];
}