export interface INutrient {
    result: boolean;
    msj:    string;
    data:   Nutrient;
}

export interface Nutrient {
    NUTRIENTID:  string;
    STATUS:      string;
    DESCRIPTION: string;
    SYMBOL:      string;
    MESURE:      string;
    MESUREID:    string;
}
