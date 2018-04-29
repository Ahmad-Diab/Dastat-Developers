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

  promocodes = []               //  array of promocodes to be displayed, promocode has promocode data
  promocodesWithCinema = []     //  array of promocodes to be displayed in table, promocode has promocode data and in which cinema
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
  p : number = 1;

  constructor(public promocodesService: PromocodesService) { }

  ngOnInit() {

    this.getPromocodes();

    // Get the distinct values of promocodes and cinemas to choose from in assigning promocodes to cinemas  
    this.promocodesService.getPromocodesAndCinemas().subscribe((response) =>{
      this.promocodesToShow = response.data.promocodeResults;
      this.cinemasToShow = response.data.cinemaResults;
      if(this.promocodesToShow.length === 0)  this.existPromocodes = "No Promocodes exist"
      else  this.existPromocodes = ""
      this.getPromocodeAttributes(this.promocodesToShow[0].promocode);
      this.promocodes = this.promocodesToShow
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

  editPromocode(promocodeValue: string, promocodeType){
    this.promocodeValueToEdit = promocodeValue;
    this.promocodeTypeEdited = promocodeType;
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

  /**
   * Filters promocodes by cinemas if the filter is not empty
   * @param cinema is used for filtering promocodes
   */
  filterCinema(cinema: string) {
    if(cinema == "") {
      this.getPromocodes();
    }
    else {
      this.promocodesService.filterCinema(cinema).subscribe((response) => {
        this.promocodesWithCinema = response.data;
      })
    }
  }

  /**
   * Filters promocodes by cinemas if the filter is not empty
   * @param cinema is used for filtering promocodes
   */
  filterPromocode(promocode: string) {
    if(promocode == "") {
      this.getPromocodes();
      this.promocodes = this.promocodesToShow;
    }
    else {
      this.promocodesService.filterPromocode(promocode).subscribe((response) => {
        this.promocodesWithCinema = response.data.promocodesWithCinema;
        this.promocodes = response.data.promocodes;
      })
    }
  }

  /**
   * Get the promocodes data in the needed arrays (promocodes, promocodesWithCinema)
   */
  getPromocodes() {
    this.promocodesService.getPromocodes().subscribe((response) => {
      this.promocodesWithCinema = response.data;
      if(this.promocodesWithCinema.length === 0)  this.existPromocodesAssigned = "No Promocodes are assigned to cinema"
      else  this.existPromocodesAssigned = ""
    });
  }

}