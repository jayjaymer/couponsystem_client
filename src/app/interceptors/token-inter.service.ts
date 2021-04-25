import { SecurityService } from './../services/security.service';
import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterService implements HttpInterceptor {

  constructor(private securityService: SecurityService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        //Don't intercept for register and login
        if (req.url.includes('/register') || req.url.includes('/login')) {
          return next.handle(req);
        }

        //Don't intercept for getCoupons in homepage
        if (req.url.includes('/general')) {
          return next.handle(req);
        }

        const authReq = req.clone({
          headers: new HttpHeaders({
            'Token':  this.securityService.getToken(),
          })
        });

        return next.handle(authReq);
      }


  }

