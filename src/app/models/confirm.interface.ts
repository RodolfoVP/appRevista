
export interface IPass {
    result: boolean;
    msj:    string;
    data:   Data;
}

export interface Data {
    CONFIRM:   string; //Espero recibir CONFIRMADO si se cambio la contraseña, si no es vacio.
}