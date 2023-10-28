export interface IFertilizer {
    result: boolean;
    msj:    string;
    data:   Fertilizer;
}

export interface Fertilizer {
    FERTILIZERID:      string;
    STATUS:            string;
    FERTILIZERCODE:    string;
    DESCRIPTION:       string;
    MESUREDESCRIPTION: string;
    PRICE:             string;
    ABBREVIATION:      string;
    MESUREID:          string;
    FERTILIZERTYPE:    string;
}
