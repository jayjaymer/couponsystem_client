import { GetOneInfoCustomerService } from './../../services/get-one-info-customer.service';
import { ActivatedRoute } from '@angular/router';
import { Coupon } from './../../models/Coupon';
import { Customer } from './../../models/Customer';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InfoCustomerComponent implements OnInit {
  public customer: Customer;
  public coupon: Coupon;




  constructor(private adminService: AdminService,
     private getOneInfoCustomerService: GetOneInfoCustomerService) {
     }

  ngOnInit(): void {

    this.getOneCustomer(this.getOneInfoCustomerService.customerID)

  }

  public getOneCustomer(id: number):void{
    this.adminService.getOneCustomer(id)
    .subscribe(data => {(this.customer)  = data;
    console.log(this.customer);},
    err => {console.log(err.error);
    });


  }





}



