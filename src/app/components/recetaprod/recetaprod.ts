import { ItemRecetaprod } from "../itemrecetaprod/itemrecetaprod";
import { Producto } from "../producto/producto";

export class Recetaprod{
    id_RECETA:string;
    fecha:Date;
    nro_RECETA:string;
    nom_RECETA:string;
    estado:string;
    reg_USER: string;
    fech_REG_USER: string;
    mod_USER: string;
    id_PRODUCTO:Producto;
    fech_MOD_USER: string;
    items: Array<ItemRecetaprod> = [];
}