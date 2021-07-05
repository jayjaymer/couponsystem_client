import { logging } from 'protractor';
import { InfoCompanyComponent } from './../../components/info-company/info-company.component';
import { UpdateCompanyComponent } from './../../components/update-company/update-company.component';
import { AddCompanyComponent } from './../../components/add-company/add-company.component';
import { Company } from './../../models/Company';
import { InfoCustomerComponent } from './../../components/info-customer/info-customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateCustomerComponent } from './../../components/update-customer/update-customer.component';
import { AddCustomerComponent } from './../../components/add-customer/add-customer.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { YesNoDiagService } from './../../services/yes-no-diag.service';

import { AdminService } from './../../services/admin.service';

import { Customer } from './../../models/Customer';

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';

import { getMatFormFieldPlaceholderConflictError } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/Coupon';
import { GetOneInfoCustomerService } from 'src/app/services/get-one-info-customer.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  displayedColumnsCustomer: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'password',
    'action',
  ];

  displayedColumnsCompany: string[] =[
  'id',
  'name',
  'email',
  'password',
  'action'

];

displayedColumnsCoupon: string[] =[
  'id',
  'companyID',
  'category',
  'title',
  'description',
  'amount',
  'price',
  'action'
];

  dataSourceCustomer: MatTableDataSource<Customer[]>;
  dataSourceCompany: MatTableDataSource<Company[]>;
  dataSourceCoupon: MatTableDataSource<Coupon[]>;

  public customer = new Customer;
  public company = new Company;
  public coupon = new Coupon;


  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private yesNoDiagService: YesNoDiagService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private getOneInfoCustomerService: GetOneInfoCustomerService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.adminService.getAllCustomers().subscribe(
      customers => this.dataSourceCustomer = new MatTableDataSource(customers),
      error => {});

      this.adminService.getAllCustomers().subscribe(
        customers => this.dataSourceCustomer.sort = this.sort,
        error => {});

        this.adminService.getAllCompanies().subscribe(
          companies => this.dataSourceCompany = new MatTableDataSource(companies),
          error => {});


        this.adminService.getAllCompanies().subscribe(
          companies => this.dataSourceCompany.sort = this.sort,
          error => {}
        );

        this.adminService.getAllCoupons().subscribe(
          coupons => this.dataSourceCoupon = new MatTableDataSource(coupons),
          error => {});


        this.adminService.getAllCoupons().subscribe(
          coupons => this.dataSourceCoupon.sort = this.sort,
          error => {}
        );


  }

// refresh components

refreshCustomers(){
  this.adminService.getAllCustomers().subscribe(coupons => {this.dataSourceCoupon = new MatTableDataSource(coupons);
    this.changeDetectorRefs.detectChanges();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['admin']);});},
  error => {});
}

refreshCompanies(){
  this.adminService.getAllCompanies().subscribe(coupons => {this.dataSourceCoupon = new MatTableDataSource(coupons);
    this.changeDetectorRefs.detectChanges();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['admin']);}
      );}
      ,
  error => {});
}


refreshCoupons(){
  this.adminService.getAllCoupons().subscribe(coupons => {this.dataSourceCoupon = new MatTableDataSource(coupons);
    this.changeDetectorRefs.detectChanges();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['admin']);});},
  error => {});
}


  // filters


  applyFilterCustomers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCustomer.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCompanies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCompany.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCoupons(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCoupon.filter = filterValue.trim().toLowerCase();
  }

  // Customer Dialogs

  public getAllCustomers(): void {
    this.adminService.getAllCustomers().subscribe(
      (customers) => {
        this.dataSourceCustomer = customers;
      },

      (error) => {
        console.log(error);
      }
      );
  }

  public deleteCustomer(id: number): void {
    this.yesNoDiagService
    .openConfirmDialog('Are you sure you want to delete Customer ID #' + id)
    .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.adminService.deleteCustomer(id).subscribe((response) => {},(error) => {})
            this.snackBar.open('Customer '+id+' was Deleted! ','OK!',{duration: 2500});
            this.refreshCustomers();
          }
        });
      }

      openAddCustomerDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "40%";
    dialogConfig.width = "17%";
    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCustomers().subscribe(
          (customers) => this.dataSourceCustomer = new MatTableDataSource(customers),
          (error) => {{console.log(error)};
        }
        )
        this.snackBar.open('Customer was created! ','OK',{duration: 2500})
      }
    })
  }

  openUpdateCustomerDialog(id: number){

    this.getOneInfoCustomerService.customerID = id;
    console.log(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "40%";
    dialogConfig.width = "17%";
    const dialogRef = this.dialog.open(UpdateCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCustomers().subscribe(
          customers => this.dataSourceCustomer = new MatTableDataSource(customers),
          error => {console.log(error);
          }
          )

        }
    })
  }



  openInfoCustomerDialog(id: number){

    this.getOneInfoCustomerService.customerID = id;
    console.log(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "65%";
    dialogConfig.width = "50%";
    const dialogRef = this.dialog.open(InfoCustomerComponent, dialogConfig);
    dialogRef.afterOpened().subscribe(res =>{
      this.adminService.getOneCustomer(id)
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCustomers().subscribe(
          customers => this.dataSourceCustomer = new MatTableDataSource(customers),
          error => {console.log(error);
          }
        )
      }
    })
  }

  // Companies Dialog

  public getAllCompanies(): void {
    this.adminService.getAllCompanies().subscribe(
      (companies) => {
        this.dataSourceCompany = companies;
      },

      (error) => {
        console.log(error);
      }
    );
  }

  openAddCompanyDialog(){
    const dialogConfig = new MatDialogConfig();
    {this.company.name}
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "40%";
    dialogConfig.width = "17%";
    const dialogRef = this.dialog.open(AddCompanyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCompanies().subscribe(
          (companies) =>{ this.dataSourceCompany = new MatTableDataSource(companies)},
          (error) => {{console.log(error)};
          }
        )
        this.snackBar.open('Company was created! ','OK',{duration: 2500})
      }
    })
  }


  public deleteCompany(id: number): void {
    this.yesNoDiagService
      .openConfirmDialog('Are you sure you want to delete Company ID #' + id)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.adminService.deleteCompany(id).subscribe((response) => {},(error) => {});
          this.snackBar.open('Company '+id+' was Deleted! ','OK!',{duration: 2500});
          this.refreshCompanies();
        }
      });

  }

  openUpdateCompanyDialog(id: number){

    this.getOneInfoCustomerService.companyID = id;
    console.log(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "40%";
    dialogConfig.width = "17%";
    const dialogRef = this.dialog.open(UpdateCompanyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCompanies().subscribe(
          companies => this.dataSourceCompany = new MatTableDataSource(companies),
          error => {console.log(error);
          }
          )
        }
    })
  }

  openInfoCompanyDialog(id: number){

    this.getOneInfoCustomerService.companyID = id;
    console.log(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "65%";
    dialogConfig.width = "50%";
    const dialogRef = this.dialog.open(InfoCompanyComponent, dialogConfig);
    dialogRef.afterOpened().subscribe(res =>{
      this.adminService.getOneCompany(id)
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.getAllCompanies().subscribe(
          companies => this.dataSourceCompany = new MatTableDataSource(companies),
          error => {console.log(error);
          }
        )
      }
    })
  }

  // Coupons

  public getAllCoupons(): void {
    this.adminService.getAllCoupons().subscribe(
      (coupons) => {
        this.dataSourceCoupon = coupons;
      },

      (error) => {
        console.log(error);
      }
    );
  }

}
