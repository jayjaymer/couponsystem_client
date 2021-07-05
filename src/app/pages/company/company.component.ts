import { InfoCouponComponent } from './../../components/info-coupon/info-coupon.component';
import { UpdateCouponComponent } from './../../components/update-coupon/update-coupon.component';
import { AddCouponComponent } from './../../components/add-coupon/add-coupon.component';
import { GetOneInfoCustomerService } from 'src/app/services/get-one-info-customer.service';
import { Company } from './../../models/Company';
import { ClientTypeService } from './../../services/client-type.service';
import { SecurityService } from './../../services/security.service';
import { CompanyService } from './../../services/company.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Coupon } from 'src/app/models/Coupon';
import { AdminService } from 'src/app/services/admin.service';
import { YesNoDiagService } from 'src/app/services/yes-no-diag.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class CompanyComponent implements OnInit{
public couponsColumns: string[] = ['id', 'title','category','amount' ,'price' ,'action'];
  public company: Company;
  public coupon: Coupon = new Coupon;
 public dataSourceCoupon: MatTableDataSource<Coupon>=null;
 @ViewChild(MatSort) sort: MatSort;


  constructor( private adminService: AdminService,
    private companyService:CompanyService,
    private yesNoDiagService: YesNoDiagService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private securityService:SecurityService,
    private clientTypeService: ClientTypeService,
    private getOneInfoCustomerService:GetOneInfoCustomerService,
    private changeDetectorRefs: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.securityService.update();
    this.clientTypeService.update();
    this.getCompanyCoupons();
    this.getOneCompany(this.getOneInfoCustomerService.companyID);

  }

  refresh(){
    this.companyService.getCompanyCoupons().subscribe(coupons => {this.dataSourceCoupon = new MatTableDataSource(coupons);
      this.changeDetectorRefs.detectChanges();
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['company']);});},
    error => {});

  }




// filters



applyFilterCoupons(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSourceCoupon.filter = filterValue.trim().toLowerCase();
}


  public getCompanyCoupons(): void {
    this.companyService.getCompanyCoupons().subscribe(
      (coupons) => {
        this.dataSourceCoupon = coupons;

      },

      (error) => {
        console.log(error);
      }
      );
  }

  public getOneCompany(id: number):void{
    this.companyService.getCompanyDetails()
    .subscribe(data => {this.company  = data;},
    err => {console.log(err.error);
    });

}
  // DIALOGS

  openAddCouponDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "60%";
    dialogConfig.width = "25%";
    const dialogRef = this.dialog.open(AddCouponComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.companyService.getCompanyCoupons().subscribe(
          (coupons) => this.dataSourceCoupon = new MatTableDataSource(coupons),
          (error) => {{console.log(error)};
        }
        )
        this.snackBar.open('Coupon was created! ','OK',{duration: 2500})
      }
    })

  }

  public deleteCoupon(id: number): void {
    this.yesNoDiagService
      .openConfirmDialog('Are you sure you want to delete Coupon ID #' + id)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.companyService.deleteCoupon(id).subscribe((response) => {},(error) => {});
          this.snackBar.open('Coupon '+id+' was Deleted! ','OK!',{duration: 2500});
          this.refresh();
        }
        }
        );


  }

  openUpdateCouponDialog(coupon:Coupon){

    this.getOneInfoCustomerService.coupon = coupon;
    console.log(coupon);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "60%";
    dialogConfig.width = "25%";
    const dialogRef = this.dialog.open(UpdateCouponComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.companyService.getCompanyCoupons().subscribe(coupons => this.dataSourceCoupon = new MatTableDataSource(coupons),error => console.error(error)
         )

        }
    })
  }


}


