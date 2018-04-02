import { Component, OnInit } from '@angular/core';
import { CinemaslistService } from '../../../@services/cinemaslist.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list.component.html',
  styleUrls: ['./cinemas-list.component.css']
})
export class CinemasListComponent implements OnInit {
  cinemas;

  constructor(public cinemalistService: CinemaslistService,
  public router: Router) { }

  ngOnInit() {
    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas=response;
      console.log(this.cinemas);
    });
  }

  cinemanav(cinema) {
    this.router.navigate(['/cinemas', cinema.name, cinema.location]);
  }

}
