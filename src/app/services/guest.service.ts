import { Coupon } from 'src/app/models/Coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private baseUrl = 'http://localhost:2000/guest/'
  constructor(private httpClient: HttpClient) { }



  public getAllCoupons(): Observable<any>{
    return this.httpClient.get<Coupon[]> (this.baseUrl+ "getCoupons");
  }


}
