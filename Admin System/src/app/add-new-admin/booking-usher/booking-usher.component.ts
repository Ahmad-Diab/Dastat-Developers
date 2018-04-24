import { Component, OnInit } from '@angular/core';
import { AddAdminService } from '../../@services/add-admin.service';
import { Data } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-booking-usher',
  templateUrl: './booking-usher.component.html',
  styleUrls: ['./booking-usher.component.scss']
})
export class BookingUsherComponent implements OnInit {
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

  //  cinemas = []

  constructor(public addAdminService : AddAdminService) { }
  
  ngOnInit() {
  // this.addAdminService.viewAllCinemas().subscribe((response)=>{
  //   this.cinemas = response.data;
  //   this.ngOnInit();
  // })

  }
addBU(username : string, password : string,
   email:string,salary:string,
   firstName:string,lastName:string,
   phoneNumber:string,gender:string,cinemaName:string){
  
    this.addAdminService.addBookingUsher(username,password,email,salary,firstName,lastName,phoneNumber,gender,cinemaName).subscribe((response)=>{     
      this.response = Response;
      this.ngOnInit();
      location.reload(); 
   });
  }
}
