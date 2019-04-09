export class LookupTypeModel {
  LookupType: string;
  Data: any;
  constructor(lookupType: string = null, data: any = null ) {
    this.LookupType = lookupType;
    this.Data = data;
  }
}
