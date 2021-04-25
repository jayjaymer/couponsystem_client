import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from 'src/app/models/Coupon';
import { GetOneInfoCustomerService } from 'src/app/services/get-one-info-customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-info-coupon',
  templateUrl: './info-coupon.component.html',
  styleUrls: ['./info-coupon.component.css']
})
export class InfoCouponComponent implements OnInit {
  public coupon: Coupon;
  constructor(private getOneInfoCustomerService: GetOneInfoCustomerService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCouponInfo(this.getOneInfoCustomerService.coupon)

  }


  public getCouponInfo(coupon: Coupon){
   this.companyService.getCompanyCoupons().subscribe((res)=>{(this.coupon) = res;console.log(res);
   },()=>{});

  }



}
