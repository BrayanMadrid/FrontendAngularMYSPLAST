
import { OrdenCompra } from "../ordencompra/ordencompra";
import { Producto } from "../producto/producto";

export class ItemOrdenCompra{
    id_ITEMORDENCOMPRA:string;
    id_ORDENCOMPRA:OrdenCompra;
    line:number;
    id_PRODUCTO:Producto;
    cantidad:number;
    precio:number;
    total:number;
}