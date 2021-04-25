import { GetOneInfoCustomerService } from './../../services/get-one-info-customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/Customer';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  public customer: Customer;
  public hide:boolean = true;



  constructor(private adminService: AdminService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
    private getOneInfoCustomerService: GetOneInfoCustomerService){}




  ngOnInit(): void {
    this.updateCustomer(this.getOneInfoCustomerService.customerID)


  }
  public updateCustomer(id: number):void{
    this.adminService.getOneCustomer(id)
    .subscribe(data => {this.customer  = data;
    console.log("customer details");},
    err => {console.log(err.error);
    });


  }

  onSubmit(){
    this.adminService.updateCustomer(this.customer).subscribe(res => console.log(res));
  this.snackBar.open('Customer '+this.customer.firstName+' was Updated! ','OK',{duration: 2500})
  , err => {console.log("error");};
    console.log(this.customer);

  }

  onChangeEvent(event: any){
    console.log("fsdghs");
  }



}



