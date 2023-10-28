
export interface ICostCenter {
    result: boolean;
    msj:    string;
    data:   CostCenter;
}

export interface CostCenter {
    STATUS: string,
    COSTCENTERCODE: string,
    DESCRIPTION: string,
    CULTIVE_VARIETY: string,
    CAMPAIGND_ESCRIPTION: string,
    STAR_TDATE: string,
    AREA_HA: string,
    COSTCENTERID: string,
    VARIETYID: string,
    CAMPAIGNID: string,
    STARTDATE: string,
    FINISHDATE: string,
    AREA: string,
    MESUREID: string,
    CULTIVEID:string
}

export interface ICostcenterValveList {
    result: boolean;
    msj:    string;
    data:   CostCenterValve[];
}

export interface ICostcenterValve {
    result: boolean;
    msj:    string;
    data:   CostCenterValve;
}

export interface CostCenterValve{
    COSTCVALVEID: string, 
    COSTCENTERID: string, 
    VALVEID: string, 
    CAMPAIGNID: string, 
    STARTDATE: string, 
    FINISHDATE: string, 
    AREA: string, 
    MESUREID: string, 
    STATUS: string, 
    VALVE_DESCRIPTION: string, 
    AREA_MESURE: string, 
    CAMPAIGN_DESCRIPTION: string, 
}