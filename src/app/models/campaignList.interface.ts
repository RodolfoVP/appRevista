// Generated by https://quicktype.io

export interface ICampaignList {
    result: boolean;
    msj:    string;
    data:   DataCampaign[];
}

export interface DataCampaign {
    CAMPAIGNID:   string;
    STATUS:       string;
    DESCRIPTION:  string;
    CAMPAIGNCODE: string;
    STARTDATE:    string;
    FINISHDATE:   string;
    RANGO_FECHAS: string;
}