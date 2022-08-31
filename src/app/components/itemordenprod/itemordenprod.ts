import { Ordenprod } from "../ordenprod/ordenprod";
import { Producto } from "../producto/producto";

export class Itemordenprod{
    
    id_ORDENPROD:Ordenprod;
    id_ITEMORDENPROD:number;
    cantidad:number;
    line:number;
    id_PRODUCTO:Producto;

}