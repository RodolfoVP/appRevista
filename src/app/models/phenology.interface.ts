export interface IPhenology {
    result: boolean;
    msj:    string;
    data:   DataPhenology;
}

export interface DataPhenology {
    PHENOLOGYID: string;
    SEQUENS:     string;
    STATUS:      string;
    DESCRIPTION: string;
    CULTIVEID:   string;
    FERTSAPPL:   string;
}
