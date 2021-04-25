import { SecurityService } from './services/security.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private securityService: SecurityService,
    private router:Router){}


    canActivate(): boolean {
      if(this.securityService.getIsLoggedIn){
        return true
      }else{
        this.router.navigate(['login'])
        return false
      }
    }

}
