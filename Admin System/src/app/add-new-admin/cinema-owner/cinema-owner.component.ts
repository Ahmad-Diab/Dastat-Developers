import { Component, OnInit, Input, Output } from '@angular/core';
import { AddAdminService } from '../../@services/add-admin.service';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-cinema-owner',
  templateUrl: './cinema-owner.component.html',
  styleUrls: ['./cinema-owner.component.scss']
})
export class CinemaOwnerComponent implements OnInit {
   username ;
   password ;
   email ;
   salary;
   firstName;
   lastName;
   phoneNumber;
   gender;
   cinemaName;
   response;
  constructor(public addAdminService : AddAdminService) { }
  
  ngOnInit() {
  // this.addAdminService.addCinemaOwner(this.username,this.password,this.email,this.salary,this.firstName,this.lastName,this.phoneNumber,this.cinemaName).subscribe((response)=>{
  //     this.ngOnInit();
  //     this.response = Response;
 
  
}
addCO(username : string, password : string,
   email:string,salary:string,
   firstName:string,lastName:string,
   phoneNumber:string,gender:string,cinemaName:string){
  
    this.addAdminService.addCinemaOwner(username,password,email,salary,firstName,lastName,phoneNumber,gender,cinemaName).subscribe((response)=>{     
      this.response = Response;
      this.ngOnInit();
      location.reload(); 
   });
  }
}
