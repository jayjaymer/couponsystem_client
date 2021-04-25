import {
Company
} from './../../models/Company';
import {
Component,
OnInit
} from '@angular/core';
import {
MatDialog
} from '@angular/material/dialog';
import {
MatSnackBar
} from '@angular/material/snack-bar';
import {
AdminService
} from 'src/app/services/admin.service';
import {
GetOneInfoCustomerService
} from 'src/app/services/get-one-info-customer.service';

@Component({
selector: 'app-update-company',
templateUrl: './update-company.component.html',
styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
public company: Company;
public hide: boolean = true;

constructor(private adminService: AdminService,
private dialog: MatDialog,
private snackBar: MatSnackBar,
private getOneInfoCustomerService: GetOneInfoCustomerService) {}


ngOnInit(): void {
this.updateCompany(this.getOneInfoCustomerService.companyID)
}


public updateCompany(id: number): void {
this.adminService.getOneCompany(id)
.subscribe(data => {
this.company = data;
console.log("company details");
},
err => {
console.log(err.error);
});
}

onSubmit() {
  this.adminService.updateCompany(this.company).subscribe(res => console.log(res));
  this.snackBar.open('Company '+this.company.name+' was Updated! ','OK',{duration: 2500})
  , err => {console.log("error");};

  console.log(this.company);

  }

  onChangeEvent(event: any){
  console.log("fsdghs");
  }
}
