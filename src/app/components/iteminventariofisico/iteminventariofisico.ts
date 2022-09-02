import { Inventariofisico } from "../inventariofisico/inventariofisico";
import { Producto } from "../producto/producto";

export class Iteminventariofisico{

    id: number;
    cantidad: number;
    id_PRODUCTO: Producto;
    id_INVENT: Inventariofisico;

}