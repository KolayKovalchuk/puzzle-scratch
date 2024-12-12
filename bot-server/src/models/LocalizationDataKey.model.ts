export class LocalizationModel {
    Key: string;
    EN: string;
    UK: string;
    PT: string;
    VI: string;
    ES: string;
    AR: string;
    FIL: string;
    RU: string;

    constructor(data: LocalizationModel) {
        this.Key = data.Key;
        this.EN = data.EN;
        this.UK = data.UK;
        this.PT = data.PT;
        this.VI = data.VI;
        this.ES = data.ES;
        this.AR = data.AR;
        this.FIL = data.FIL;
        this.RU = data.RU;
    }
}