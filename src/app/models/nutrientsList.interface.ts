// Generated by https://quicktype.io

export interface INutrientsList {
    result: boolean;
    msj:    string;
    data:   DataNutrient[];
}

export interface DataNutrient {
    NUTRIENTID:  string;
    STATUS:      string;
    DESCRIPTION: string;
    SYMBOL:      string;
    MESURE:      string;
    MESUREID:    string;
}
