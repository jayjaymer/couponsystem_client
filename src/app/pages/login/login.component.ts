import { ExceptionService } from './../../services/exception.service';
import { LoginResponse } from './../../models/LoginResponse';
import { CompanyService } from './../../services/company.service';
import { CustomerService } from './../../services/customer.service';
import {
  ClientTypeService
} from './../../services/client-type.service';
import {
  MatDialog, MatDialogConfig
} from '@angular/material/dialog';
import {
  SecurityService
} from './../../services/security.service';
import {
  AdminService
} from './../../services/admin.service';
import {
  Router
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpResponse
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  type: string;
  token: string;

  constructor(private router: Router,
    private adminService: AdminService,
    private securityService: SecurityService,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private dialog: MatDialog,
    private clientTypeService: ClientTypeService,
    private exceptionService: ExceptionService) {}

  ngOnInit(): void {

  }


  public login() {
    const typeTemp = this.type;
    const emailTemp = this.email;
    const passwordTemp = this.password;

    switch (typeTemp) {
      case 'admin': {
        console.log(typeTemp);
        this.adminService.login(this.email, this.password).subscribe(
          (res: LoginResponse) => {
            localStorage.setItem("Token", res.token);
            console.log(res);
            localStorage.setItem("Type", "admin");
            localStorage.setItem("LoggedIn", "true");
            this.securityService.update();
            this.clientTypeService.update();
            this.router.navigate(['/home'])


          },(error)=>{this.wrongInfoE()} );
          break;
        }
            case 'company':
              {
                this.companyService.login(this.email,this.password).subscribe(
                  (res: LoginResponse)=>{
                    localStorage.setItem("Token", res.token);
                    console.log(res);
                    localStorage.setItem("Type", "company");
                    localStorage.setItem("LoggedIn", "true");
                  this.securityService.update();
                  this.clientTypeService.update();
                  this.router.navigate(['/home'])
              }, (error)=>{this.wrongInfoE();
              },);
              break;
        }
        case 'customer':
          {
          this.customerService.login(this.email,this.password).subscribe(
            (res: LoginResponse)=>{
              localStorage.setItem("Token", res.token);
              console.log(res);
              localStorage.setItem("Type", "customer");
              localStorage.setItem("LoggedIn", "true");
              this.securityService.update();
                  this.clientTypeService.update();
                  this.router.navigate(['/home'])
      }, (error)=>{this.wrongInfoE();
      },);
      break;
      }
    }}


    wrongInfoE(){
      this.exceptionService
      .openConfirmDialog('Sorry, the login info is incorrect! Please try againe..')
      .afterClosed();
    }



  }





