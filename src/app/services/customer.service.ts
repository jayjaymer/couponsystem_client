import { Coupon } from 'src/app/models/Coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { Customer } from '../models/Customer';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:2000/customer/'

  constructor(private httpClient: HttpClient,
    private securityService: SecurityService) { }

    public login(email: string, password: string): Observable < any > {
      return this.httpClient.post < LoginResponse > (this.baseUrl + "login?email=" + email + "&password=" + password, null);
    }

    public purchaseCoupon(coupon: Coupon): Observable < any > {
      const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
      const options = { headers: headers , body: coupon};
      return this.httpClient.post < any > (this.baseUrl + "purchaseCoupon", coupon, options);
    }

    public getCustomerCoupons(): Observable < any > {
      const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
      const options = { headers: headers};
      return this.httpClient.get < Coupon[] > (this.baseUrl + 'getCustomerCoupons', options);
    }

    public getCustomerCouponsByCategory(category: string): Observable < any > {
      const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
      const options = { headers: headers};
      return this.httpClient.get < Coupon[] > (this.baseUrl + 'getCustomerCouponsByCategory', options);
    }

    public getCustomerDetails(): Observable < Customer > {
      const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
      const options = { headers: headers};
      return this.httpClient.get  < Customer> (this.baseUrl + 'getCustomerDetails')
    }

}
