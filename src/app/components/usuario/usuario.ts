import { Rol } from "../rol/rol";

export class Usuario{
    id: number;
    username: string;
    nombre: string;
    correo: string;
    enabled: boolean;
    password : string;
    rol: Rol[] = [];
}