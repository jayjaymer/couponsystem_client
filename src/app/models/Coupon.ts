export class Coupon {
  static forEach(arg0: (element: any) => number) {
    throw new Error('Method not implemented.');
  }


  public constructor(public id ? : number,
    public companyID ? : number,
    public title ? : string,
    public startDate ? : string,
    public endDate ? : string,
    public amount ? : number,
    public category ? : string,
    public description ? : string,
    public price ? : number,
    public image ? : string) {}



}

