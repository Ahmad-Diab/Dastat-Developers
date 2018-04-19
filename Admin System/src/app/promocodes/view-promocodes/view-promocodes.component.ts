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
  existPromocodes = ""  // String that when there are no promocodes, assigned to a message stating that for the admin
  promocodesToShow = [] //array of unique promocodes to choose from for assigning  promocode to cinema
  cinemasToShow = [] //array of cinemas to choose between for assigning promocode to cinema
  promocodeValue =  ""; //variable for ngModel
  cinemaValue = ""; //variable for ngModel
  promocodeActions = false    // boolean for showing/hiding actions like assign, add, edit
  responseStatus = "";

  constructor(public promocodesService: PromocodesService) { }

  ngOnInit() {

    //  Get the promocodes data in promocodes array
    this.promocodesService.getPromocodes().subscribe((response) => {
      this.promocodes = response.data;
      if(this.promocodes.length === 0)  this.existPromocodes = "No Promocodes exist"
      else  this.existPromocodes = ""
    });

    // Get the distinct values of promocodes and cinemas to choose from in assigning promocodes to cinemas  
    this.promocodesService.getPromocodesAndCinemas().subscribe((response) =>{
      this.promocodesToShow = response.data.promocodeResults;
      this.cinemasToShow = response.data.cinemaResults;
    });

  }

    // Inserting values from the ngModel into the service 
  assignPromocodeToCinema(){
    if(this.cinemaValue === ""){
      this.promocodesService.assignPromocodeToCinema(this.promocodeValue,this.cinemaValue,this.cinemaValue).subscribe((response) =>{
        this.responseStatus = response.msg;
      })      
    }
    this.promocodesService.assignPromocodeToCinema(this.promocodeValue,this.cinemaValue.split(",")[0],this.cinemaValue.split(",")[1]).subscribe((response) =>{
      this.responseStatus = response.msg;
    })
  }

  /**
   * toggles between showing and hiding the promocodes actions by changing the var that the actions visibility depend on
   * Actions are: assign promocode to cinema, Add promocode, edit promocode
   */
  togglePromocodeActions() {
    this.promocodeActions = !this.promocodeActions
  }


  delete(promocode: any){
    console.log(promocode.promocode);
    this.promocodesService.deletePromocode(promocode.promocode).subscribe((response) =>{
      this.responseStatus = response.msg;
     })
     this.ngOnInit();
}
AddPromocode(promocode:string ,value:string ,type:string) {
  this.promocodesService.AddPromocodes(promocode,value,type).subscribe((response) =>{
    this.responseStatus = response.msg;
  })
}

}
