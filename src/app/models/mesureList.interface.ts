// Generated by https://quicktype.io

export interface IMesureList {
    result: boolean;
    msj:    string;
    data:   dataMesure[];
}

export interface dataMesure {
    MESUREID:    string;
    STATUS:      string;
    DESCRIPTION: string;
    UNIDAD:      string;
    TIPO:        string;
    MESURETYPEID:string; 
}
