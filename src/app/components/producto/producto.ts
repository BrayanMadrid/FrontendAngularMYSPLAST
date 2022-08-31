import { Categoria } from "../categoria/categoria";
import { Marca } from "../marca/marca";
import { Unmedida } from "../unmedida/unmedida";

export class Producto{

    id_PRODUCTO: string;
    nombre: string;
    desc_PRODUCTO: string;
    flag_PRODUCCION: string;
    flag_INSUMO: string;
    estado: string;
    reg_USER: string;
    fech_REG_USER: string;
    mod_USER: string;
    fech_MOD_USER: string;
    id_UNMEDIDA: Unmedida;
    id_MARCA: Marca;
    id_CATEGORIA: Categoria;
    
}