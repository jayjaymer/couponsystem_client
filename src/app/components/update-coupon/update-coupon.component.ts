import { Coupon } from 'src/app/models/Coupon';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetOneInfoCustomerService } from 'src/app/services/get-one-info-customer.service';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {
  public coupon: Coupon;
  value = 'Clear me';

  constructor(private companyService:CompanyService,
    private dialog: MatDialog,
private snackBar: MatSnackBar,
private getOneInfoCustomerService: GetOneInfoCustomerService) { }

  ngOnInit(): void {
    this.coupon = this.getOneInfoCustomerService.coupon;
  }


public updateCoupon(id: number): void{
  this.companyService.getCompanyDetails().subscribe(
    data => {this.coupon = data; console.log("coupon details");},
    (err => {console.log(err);}));

}

onSubmit(){
this.companyService.updateCoupon(this.coupon).subscribe(
  res => console.log(res));
  this.snackBar.open('Coupon #'+this.coupon.id+' was Updated! ','OK',{duration: 2500})
  , err => {console.log("error");};
    console.log(this.coupon);
}

onChangeEvent(event: any){
}


}
