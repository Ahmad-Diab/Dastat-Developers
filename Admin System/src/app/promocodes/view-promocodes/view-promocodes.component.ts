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

  promocodes = []               //  array of promocodes, promocode has promocode data and in which cinema
  promocodesToShow = []         //  array of unique promocodes to choose from for assigning  promocode to cinema
  cinemasToShow = []            //  array of cinemas to choose between for assigning promocode to cinema

  promocodeValue =  "";         //  variable for holding the promocode value when assigning a promocode to cinema
  cinemaValue = "";             //  variable for holding the cinema value when assigning a promocode to cinema

  promocodeValueToEdit= "";     //  promocode to be edited
  promocodeTypeEdited= "";      //  variable for ngModel for promocode type for edit
  promocodeValueEdited= "";     //  variable for ngModel for promocode value for edit

  existPromocodesAssigned = ""  //  String, that when there are no promocodes assigned to a cineama, has message stating that for the admin
  existPromocodes = ""          //  String, that when there are no promocodes, has message stating that for the admin
  assignResponseStatus = "";    //  message for user when assigning promocode to cinema
  editResponseStatus= ""; 
  addResponseStatus= "";
  deleteResponseStatus = "";    //  var that contains the message to the user upon deletion

  promocodeActions = false      //  boolean for showing/hiding actions like assign, add, edit
  assignedPromocodeView = true  //  controls which view is displayed. either view of promocodes or view of promocodes in which cinemas


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
      this.getPromocodeAttributes(this.promocodesToShow[0].promocode);
    });



  }

    // Inserting values from the ngModel into the service 
  assignPromocodeToCinema(promocode : string,cinema : string){
    this.promocodeValue = promocode;
    this.cinemaValue = cinema;
    if(this.cinemaValue === ""){
      this.promocodesService.assignPromocodeToCinema(this.promocodeValue,this.cinemaValue,this.cinemaValue).subscribe((response) =>{
        this.assignResponseStatus = response.msg;
        this.ngOnInit();
      })      
    }
    else{
      this.promocodesService.assignPromocodeToCinema(this.promocodeValue,this.cinemaValue.split(",")[0],this.cinemaValue.split(",")[1]).subscribe((response) =>{
        this.assignResponseStatus = response.msg;
        this.ngOnInit();
      });
    }  
  }

  delete(promocode: any){
    console.log(promocode.promocode);
    this.promocodesService.deletePromocode(promocode.promocode).subscribe((response) =>{
      this.deleteResponseStatus = response.msg;
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

  //  get specific promocode
  getPromocodeAttributes(promocodeValue: string) {
    this.promocodeValueToEdit = promocodeValue;
    this.promocodesService.getPromocodeAttr(this.promocodeValueToEdit).subscribe((response) =>{
      this.promocodeTypeEdited = response.data[0].type;
      this.promocodeValueEdited = response.data[0].value;
    })
  }

}