import { Component, OnInit } from '@angular/core';
import { PromocodesService } from '../../@services/promocodes.service';
import { FormControl} from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-view-promocodes',
  templateUrl: './view-promocodes.component.html',
  styleUrls: ['./view-promocodes.component.scss']
})
export class ViewPromocodesComponent implements OnInit {

  promocodes = []   // array of promocodes, promocode has promocode data and in which cinema
  existPromocodesAssigned = ""  // String, that when there are no promocodes assigned to a cineama, has message stating that for the admin
  existPromocodes = ""  // String, that when there are no promocodes, has message stating that for the admin
  promocodesToShow = [] //array of unique promocodes to choose from for assigning  promocode to cinema
  cinemasToShow = [] //array of cinemas to choose between for assigning promocode to cinema
  promocodeValue =  ""; //variable for ngModel
  cinemaValue = ""; //variable for ngModel
  promocodeActions = false    // boolean for showing/hiding actions like assign, add, edit
  responseStatus = "";
  promocodeValueToEdit= "";//variable for ngModel
  promocodeTypeEdited= "";//variable for ngModel
  promocodeValueEdited= "";//variable for ngModel
  editResponseStatus= ""; 
  addResponseStatus= "";
  assignedPromocodeView = true // controls which view is displayed. either view of promocodes or view of promocodes in which cinemas

  constructor(public promocodesService: PromocodesService) { }

  ngOnInit() {

    //  Get the promocodes data in promocodes array
    this.promocodesService.getPromocodes().subscribe((response) => {
      this.promocodes = response.data;
      if(this.promocodes.length === 0)  this.existPromocodesAssigned = "No Promocodes are assigned to cinema"
      else  this.existPromocodesAssigned = ""
    });

    // Get the distinct values of promocodes and cinemas to choose from in assigning promocodes to cinemas  
    this.promocodesService.getPromocodesAndCinemas().subscribe((response) =>{
      this.promocodesToShow = response.data.promocodeResults;
      this.cinemasToShow = response.data.cinemaResults;
      if(this.promocodesToShow.length === 0)  this.existPromocodes = "No Promocodes exist"
      else  this.existPromocodes = ""
    });

  }

    // Inserting values from the ngModel into the service 
  assignPromocodeToCinema(promocode : string,cinema : string){
    this.promocodeValue = promocode;
    this.cinemaValue = cinema;
    if(this.cinemaValue === ""){
      this.promocodesService.assignPromocodeToCinema(this.promocodeValue,this.cinemaValue,this.cinemaValue).subscribe((response) =>{
        this.responseStatus = response.msg;
      })      
    }
    else{
      this.promocodesService.assignPromocodeToCinema(this.promocodeValue,this.cinemaValue.split(",")[0],this.cinemaValue.split(",")[1]).subscribe((response) =>{
        this.responseStatus = response.msg;
      });
    }  
    this.ngOnInit();
  }

  delete(promocode: any){
    console.log(promocode.promocode);
    this.promocodesService.deletePromocode(promocode.promocode).subscribe((response) =>{
      this.responseStatus = response.msg;
      this.ngOnInit();
    })
  }

  addPromocode(promocode:string ,value:string ,type:string) {
    this.promocodesService.addPromocodes(promocode,value,type).subscribe((response) =>{
      this.addResponseStatus = response.msg;
      this.ngOnInit();
    })
  }

  editPromocode(promocodeValue: string){
    this.promocodeValueToEdit = promocodeValue;
    this.promocodesService.editPromocode(this.promocodeValueToEdit,this.promocodeTypeEdited,this.promocodeValueEdited).subscribe((response) =>{
      this.editResponseStatus= response.msg;
      this.ngOnInit();
    })
  }
}