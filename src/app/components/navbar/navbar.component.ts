import { YesNoDiagService } from './../../services/yes-no-diag.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { ClientTypeService } from './../../services/client-type.service';
import { SecurityService } from './../../services/security.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
    public securityService: SecurityService,
    public clientTypeService: ClientTypeService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private yesNoDiagService:YesNoDiagService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }


  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




  public isLogged(): void{
    this.yesNoDiagService.openConfirmDialog('Are you sure?').afterClosed().subscribe((res)=>{
      if(res){
        if(this.isLoggedIn()){

          this.adminService.logout(localStorage.getItem('Token')).subscribe();
          localStorage.removeItem('Token');
          localStorage.removeItem('LoggedIn');
          localStorage.removeItem('Type');
          this.snackBar.open('Signed Out!','OK!',{duration: 2500});
      }
      this.router.navigateByUrl('login')}
      (error)=> {console.log(error)};

    });
  }

  public logout(): void{


  }

  public isLoggedIn():boolean{


    if(localStorage.getItem('LoggedIn')==="true"){

      return true;
    }
   return false;
  }

}




