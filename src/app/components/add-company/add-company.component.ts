import { Company } from './../../models/Company';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public hide:boolean = true;
  public company = new Company();

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddCompanyComponent>,


     ) { }

  ngOnInit(): void {
  }

  public addCompany(): void{
    {this.company.email}
    {this.company.name}
    {this.company.password}

    this.adminService.addCompany(this.company).subscribe(


      (res) => {
      this.adminService.getAllCompanies();
      this.snackBar.open('Company '+this.company.name+' was created! ','OK',{duration: 2500})
        },
         (err) => {console.log("addtriggerd");

      })


       }


}
