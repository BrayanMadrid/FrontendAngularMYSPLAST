
import { Producto } from "../producto/producto";
import { Recetaprod } from "../recetaprod/recetaprod";

export class ItemRecetaprod{
    id_ITEMORDENCOMPRA:string;
    id_RECETA:Recetaprod;
    id_PRODUCTO:Producto;
    cantidad:number;
}