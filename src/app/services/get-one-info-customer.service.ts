import { Coupon } from 'src/app/models/Coupon';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetOneInfoCustomerService {

  customerID: number;
  companyID: number;
  couponID: number;

  coupon: Coupon;


  constructor() { }
}
