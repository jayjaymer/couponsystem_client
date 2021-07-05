import { SecurityService } from './../../services/security.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNoDiagService } from './../../services/yes-no-diag.service';
import { CustomerService } from './../../services/customer.service';
import { GuestService } from './../../services/guest.service';
import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from 'src/app/models/Coupon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public coupons:Coupon[];

  constructor(private guestService: GuestService, private customerService:CustomerService,
    private yesNoDiagService: YesNoDiagService,
    private snackBar: MatSnackBar,
    public securityService:SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCoupon();

  }


  public getAllCoupon(): void{
    this.guestService.getAllCoupons().subscribe((res)=>{this.coupons = res},
    (err) => {console.log(err);
    });

  }


  public purchaseCoupon(coupon:Coupon){
    this.yesNoDiagService
    .openConfirmDialog('Are you sure you want to purchase a coupon? #' +coupon.id)
    .afterClosed()
    .subscribe((res) => {
    if (res) {
    this.customerService.purchaseCoupon(coupon).subscribe(
      (res)=>{console.log(res);
      },
      (err)=>{
        if(err.status=== 201){
          this.router.navigate(['/customer']);
          this.getAllCoupon();
          this.snackBar.open('Congratulations! You have purchased A coupon. ','OK',{duration: 2500});
        }else{
          this.snackBar.open('Sorry, You cant purchase this coupon','OK',{duration: 2500});
        }});
      }});
  }
}
