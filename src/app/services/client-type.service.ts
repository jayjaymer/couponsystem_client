import { CompanyService } from './company.service';
import { CustomerService } from './customer.service';
import { SecurityService } from './security.service';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {
  public customer:Customer;
  public company:Company;

  constructor(private securityService: SecurityService,
    private customerService: CustomerService,
    private companyService: CompanyService
    ) { }

    getCustomer=()=>{
      return this.customer;
    }

    getCompany=()=>{
      return this.company;
    }

    update=()=>{

      if(this.securityService.getIsLoggedIn){

        if(this.securityService.getService()==='company'){
          this.companyService.getCompanyDetails().subscribe(
            company=>{this.company=company},
            err=>{}
          );
        }

        if(this.securityService.getService()==='customer'){
          this.customerService.getCustomerDetails().subscribe(
            customer=>{this.customer=customer},
            err=>{}
          );
        }
      }

    }

}
