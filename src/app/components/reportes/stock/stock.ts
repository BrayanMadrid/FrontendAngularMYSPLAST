import { Producto } from "../../producto/producto";
import { Sector } from "../../sector/sector";

export class Stock{

    id: number;
    id_PRODUCTO: Producto;
    cantidad: number;
    id_SECTOR: Sector;

}