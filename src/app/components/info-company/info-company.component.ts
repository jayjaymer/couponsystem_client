import { GuestService } from './../../services/guest.service';
import { Company } from './../../models/Company';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { AdminService } from 'src/app/services/admin.service';
import { GetOneInfoCustomerService } from 'src/app/services/get-one-info-customer.service';

@Component({
  selector: 'app-info-company',
  templateUrl: './info-company.component.html',
  styleUrls: ['./info-company.component.css']
})
export class InfoCompanyComponent implements OnInit {
  public company: Company;
  public coupon: Coupon;
  public coupons:Coupon[];

  constructor(private adminService: AdminService,
    private getOneInfoCustomerService: GetOneInfoCustomerService,
    private guestService: GuestService) {
    }

  ngOnInit(): void {
    this.getOneCompany(this.getOneInfoCustomerService.companyID)
    // this.getCoupons();

  }

//   public getOneCompany(id: number):void{
//     this.adminService.getOneCompany(id)
//     .subscribe(data => {this.company  = data;
//     console.log(this.company);},
//     err => {console.log(err.error);
//     });

// }

    public getOneCompany(id: number):void{
      this.adminService.getOneCompany(id)
      .subscribe(data => {(this.company)  = data;
      console.log(data);},
      err => {console.log(err.error);
      });


  }


  public getCoupons(){
      this.guestService.getAllCoupons().subscribe((res: Coupon[])=>{
       let coupons = res.filter((coupon)=> coupon.companyID===this.getOneInfoCustomerService.companyID)
        this.coupons = coupons;
      },()=>{});
  }
}
