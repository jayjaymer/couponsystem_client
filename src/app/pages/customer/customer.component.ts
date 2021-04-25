import { GetOneInfoCustomerService } from 'src/app/services/get-one-info-customer.service';
import { ClientTypeService } from './../../services/client-type.service';
import { SecurityService } from './../../services/security.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/Coupon';
import { Customer } from 'src/app/models/Customer';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public couponsColumns: string[] = ['id', 'title','category','amount' ,'price' ];
  public customer:Customer;
  public coupon: Coupon;
  public dataSourceCoupon: MatTableDataSource<Coupon>=null;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private customerService:CustomerService,
    private securityService:SecurityService,
    private clientTypeService:ClientTypeService,
    private getOneInfoCustomerService:GetOneInfoCustomerService
    ) { }

  ngOnInit(): void {
    this.getCustomerCoupons();
    this.getOneCustomer(this.getOneInfoCustomerService.customerID);
    this.securityService.update();
    this.clientTypeService.update();


  }




  getCustomerCoupons(): void{
    this.customerService.getCustomerCoupons().subscribe(
      (coupons)=>{this.dataSourceCoupon = coupons;console.log(coupons);
      },
      (error)=>{console.log(error);
      }

    );
  }

  getOneCustomer(id: number){
    this.customerService.getCustomerDetails().subscribe(
      (data)=>{this.customer = data},
      (err)=>{console.log(err);
      }

    );

  }


  // filters
  applyFilterCoupons(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCoupon.filter = filterValue.trim().toLowerCase();
  }

}
