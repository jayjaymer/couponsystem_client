import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  type: string;
  value = 'Clear me';
  public hide:boolean = true;
  public coupon = new Coupon();
  public company: any;

  constructor(private dialog: MatDialog,
  private snackBar: MatSnackBar,
  private companyService: CompanyService,
  public dialogRef: MatDialogRef<AddCouponComponent>) { }


  ngOnInit(): void {
    this.getID();

  }

public addCoupon(): void{
  this.coupon.companyID = this.company.id;
  {this.coupon.title}
  {this.coupon.startDate}
  {this.coupon.endDate}
  {this.coupon.category}
  {this.coupon.description}
  {this.coupon.amount}
  {this.coupon.price}
  {this.coupon.image = "sTam image"}



  this.companyService.createCoupon(this.coupon).subscribe(
    (res) => {this.companyService.getCompanyCoupons(); this.snackBar.open('Coupon #'+this.coupon.id+' was created! ','OK',{duration: 2500})},
    (err) => {console.log(err)})
    console.log(this.coupon);

  }

  public getID(){
    this.companyService.getCompanyDetails().subscribe(
      (res)=>{this.company = res; console.log(this.company);
      },() => {}
    )
  }


}
