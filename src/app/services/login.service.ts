import { LoginComponent } from './../pages/login/login.component';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token: string;
  public type: string;
  public  isLoggedIn: boolean;

  public constructor(private HttpClient: HttpClient) { }
  public loginRequest(loginComponent:LoginComponent):Observable<LoginComponent>{
    return null;
  }
}
