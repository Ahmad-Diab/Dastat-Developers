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

  constructor(public promocodesService: PromocodesService) { }

  ngOnInit() {

    //  Get the promocodes data in prmocodes array
    this.promocodesService.getPromocodes().subscribe((response) => {
      this.promocodes = response.data;
      if(this.promocodes.length === 0)  this.existPromocodes = "No Promocodes exist"
      else  this.existPromocodes = ""
    });

  }

}
