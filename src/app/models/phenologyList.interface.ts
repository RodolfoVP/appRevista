// Generated by https://quicktype.io

export interface IPhenologyList {
    result: boolean;
    msj:    string;
    data:   DataPhenology[];
}

export interface DataPhenology {
    PHENOLOGYID: string;
    SEQUENS:     string;
    STATUS:      string;
    DESCRIPTION: string;
    CULTIVEID:   string;
    FERTSAPPL:   string;
}