import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/Customer';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {


  public hide:boolean = true;
  public customer = new Customer();


  constructor(private dialog: MatDialog,
   private snackBar: MatSnackBar,
   private adminService: AdminService,
   public dialogRef: MatDialogRef<AddCustomerComponent>,


    ) { }

  ngOnInit(): void {
  }



 public addCustomer(): void{
   {this.customer.firstName}
   {this.customer.lastName}
   {this.customer.email}
   {this.customer.password}


  this.adminService.addCustomer(this.customer).subscribe(
    (res) => {
      this.adminService.getAllCustomers();
    this.snackBar.open('Customer '+this.customer.firstName+' was created! ','OK',{duration: 2500})
  }, (err) => {console.log(err)})

 }



  }

