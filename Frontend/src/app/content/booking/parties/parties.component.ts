import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../../../@services/parties.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  parties=[];

  constructor(public partiesService:PartiesService) { }

  ngOnInit() {
    this.partiesService.getParties().subscribe((response) =>{
      this.parties = response.data;
      console.log(response.data);

    });
  }

}
