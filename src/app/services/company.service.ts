import { Coupon } from 'src/app/models/Coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { Company } from '../models/Company';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:2000/company/'

  constructor(private httpClient: HttpClient,
    private securityService: SecurityService) { }


    public login(email: string, password: string): Observable < any > {
      return this.httpClient.post < LoginResponse > (this.baseUrl + "login?email=" + email + "&password=" + password, null);
    }

  public createCoupon(coupon:Coupon): Observable < any > {

    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers , body: coupon};
    return this.httpClient.post<any> (this.baseUrl+ "createCoupon", coupon , options);
  }


  public updateCoupon(coupon: Coupon): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers , body: coupon};

    return this.httpClient.put < any > (this.baseUrl + "updateCoupon", coupon, options);
  }

  public deleteCoupon(id: number): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers};
    return this.httpClient.delete < any > (this.baseUrl + "deleteCoupon/" + id, options);
  }

  public getCompanyCoupons(): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers};
    return this.httpClient.get < Coupon[] > (this.baseUrl + 'getCoupons', options);
  }

public getCompanyDetails(): Observable <Company> {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers};
  return this.httpClient.get < Company > (this.baseUrl+ 'getCompanyDetails' , options);
}



}
