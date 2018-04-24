import { Component, OnInit, Input, Output } from '@angular/core';
import { AddAdminService } from '../../@services/add-admin.service';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-branch-manager',
  templateUrl: './branch-manager.component.html',
  styleUrls: ['./branch-manager.component.scss']
})
export class BranchManagerComponent implements OnInit {
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
}
addBM(username : string, password : string,
   email:string,salary:string,
   firstName:string,lastName:string,
   phoneNumber:string,gender:string,cinemaName:string){
  
    this.addAdminService.addBranchManager(username,password,email,salary,firstName,lastName,phoneNumber,gender,cinemaName).subscribe((response)=>{     
      this.response = Response;
      this.ngOnInit();
      location.reload();
   });
  }
  
}
