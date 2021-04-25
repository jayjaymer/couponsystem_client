import { SecurityService } from './security.service';
import {
  Customer
} from './../models/Customer';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import { Company } from '../models/Company';
import { Coupon } from '../models/Coupon';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:2000/admin/'


  constructor(private httpClient: HttpClient,
    private securityService: SecurityService) {}


  public login(email: string, password: string): Observable < any > {
    const response = this.httpClient.post < LoginResponse > (this.baseUrl + "/login?email=" + email + "&password=" + password,null);

    return response;
  }


  // public getAllCompanies(): Observable<Company[]> {
  //   // return this.httpClient.get<Customer[]>('../../../assets/json/customers.json', {headers: this.getHeaders(), withCredentials: true });
  //   const headers = new HttpHeaders({ 'Coupon-System-Header': this.tokenManagerService.getToken() });
  //   const options = { headers: headers };
  //   return this.httpClient.get<Company[]>('http://localhost:8080/admin/get-all-companies', options);
  // }

  public logout(token: string): Observable< any >{
    return this.httpClient.delete<any>(this.baseUrl +"logout?token="+ token);
  }


  //Customers:

  public addCustomer(customer: Customer): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers , body: customer};
    return this.httpClient.post < any > (this.baseUrl + "addCustomer", customer, options);
  }

  public updateCustomer(customer: Customer): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers , body: customer};

    return this.httpClient.put < any > (this.baseUrl + "updateCustomer", customer, options);
  }

  public deleteCustomer(id: number): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers};
    return this.httpClient.delete < any > (this.baseUrl + "deleteCustomer/" + id, options);
  }


  public getAllCustomers(): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers};
    return this.httpClient.get < Customer[] > (this.baseUrl + 'getAllCustomers', options);
  }

  public getOneCustomer(id: number): Observable < any > {
    const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
    const options = { headers: headers};
    return this.httpClient.get < any > (this.baseUrl + "getOneCustomer/" + id, options);
  }


// Companies

public addCompany(company: Company): Observable < any > {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers, body: company};
  return this.httpClient.post < any > (this.baseUrl + "addCompany", company, options);
}

public updateCompany(company: Company): Observable < any > {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers, body: company};
  return this.httpClient.put < any > (this.baseUrl + "updateCompany", company, options);
}

public deleteCompany(id: number): Observable < any > {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers};
  return this.httpClient.delete < any > (this.baseUrl + "deleteCompany/" + id, options);
}


public getAllCompanies(): Observable < any > {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers};
  return this.httpClient.get < Company[] > (this.baseUrl + 'getAllCompanies' , options);
}

public getOneCompany(id: number): Observable < any > {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers};
  return this.httpClient.get < any > (this.baseUrl + "getOneCompany/" + id, options);
}

// Coupons

public getAllCoupons(): Observable < any > {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers};
  return this.httpClient.get<Coupon[]> (this.baseUrl+ 'getAllCoupons', options);
}

public getAllCouponsByCompanyID(id: number): Observable <any> {
  const headers = new HttpHeaders({'Token': localStorage.getItem('Token')})
  const options = { headers: headers};

  return this.httpClient.get<Coupon[]>(this.baseUrl+ 'getCouponsByCompanyID/'+id);
}



}
