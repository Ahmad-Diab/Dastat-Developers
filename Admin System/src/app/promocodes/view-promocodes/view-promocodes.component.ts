import { Component, OnInit } from '@angular/core';
import { PromocodesService } from '../../@services/promocodes.service';

@Component({
  selector: 'app-view-promocodes',
  templateUrl: './view-promocodes.component.html',
  styleUrls: ['./view-promocodes.component.scss']
})
export class ViewPromocodesComponent implements OnInit {

  constructor(public promocodesService: PromocodesService) { }

  ngOnInit() {
  }

}
