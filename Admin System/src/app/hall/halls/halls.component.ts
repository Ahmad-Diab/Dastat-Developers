import { Component, OnInit } from '@angular/core';
import { Hall } from '../../@objects/hall';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss']
})
export class HallsComponent implements OnInit {

  halls: Hall[];

  constructor() { }

  ngOnInit() {
    
  }

  editHall(hall: Hall) {

  } 

  addHall() {

  }

  deleteHall(hall: Hall) {

  }

}
