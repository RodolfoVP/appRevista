
export interface IVariety {
    result: boolean;
    msj:    string;
    data:   Variety;
}

export interface Variety {
    VARIETYID:   string;
    VARIETYCODE: string;
    STATUS:      string;
    DESCRIPTION: string;
    CULTIVEID:   string;
}
