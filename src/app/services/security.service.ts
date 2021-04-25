import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements OnInit {
  getCompanyDetails() {
    throw new Error('Method not implemented.');
  }
  getCustomerDetails() {
    throw new Error('Method not implemented.');
  }

  private isLoggedIn:boolean=false;
  private token:string=" ";
  private type:string=" ";

  constructor() { }
  ngOnInit(): void {
    this.isLoggedIn=localStorage.getItem('LoggedIn')==='true'? true:false;
    this.token=localStorage.getItem('Token');
    this.type=localStorage.getItem('Type');

  }

  public isAdmin(){
     return localStorage.getItem('Type')==='admin'
  }

  public isCompany(){
     return localStorage.getItem('Type')==='company'
  }

  public isCustomer(){
     return localStorage.getItem('Type')==='customer'
  }

  getIsLoggedIn=()=>{
    return this.isLoggedIn;
  }

  setIsLoggedIn=(x:boolean)=>{
    this.isLoggedIn=x;
  }

  getToken=()=>{
    return this.token;
  }

  setToken=(x:string)=>{
    this.token=x;
  }

  getService=()=>{
    return this.type;
  }

  setService=(s:string)=>{
    this.type=s;
  }

  update=()=>{
    this.ngOnInit();
  }

}
