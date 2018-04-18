import { Component, OnInit } from '@angular/core';
import { PromocodesService } from '../../@services/promocodes.service';

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
  edit = false
  noEdit = true

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

}
