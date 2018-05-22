import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../../../@services/parties.service';
import { MovieslistService } from '../../../@services/movieslist.service';
import {Router, ActivatedRoute} from '@angular/router'
import { CookieService } from 'angular2-cookie/core';
import { BookingService } from '../../../@services/booking.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';



@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class PartiesComponent implements OnInit {
  parties=[];
  movies=[];
  cinemas=[];
  selectedCinema;
  selectedMovie;
  selectedParty ;
  date;
  flagD;
  flagC;
  flagM;
  dateTemp;
  choosenDate;
  day0;
  day1;
  day2;
  day3;
  day4;
  today;

  constructor(public partiesService:PartiesService,
    public router : Router,
    public route: ActivatedRoute,
    public cookie : CookieService,
    public movieslistService: MovieslistService,
    public bookingService: BookingService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getDates();

    this.selectedCinema = this.cookie.getObject('cinema');
    this.selectedMovie = this.cookie.getObject('movie');
    if(this.selectedMovie)
      this.viewCinemas();
  }

  viewMovies(){
    this.movieslistService.getMovies().subscribe((response)=>{
      this.movies=response;
    });
  }

  viewCinemas(){
    this.bookingService.getMoviesForThisCinema(this.selectedMovie.movie_id).subscribe((response) => {
      this.cinemas=response.data;
      //console.log(this.cinemas);
    });
  }

  updateMovie(movie){
    this.selectedMovie = movie;
    this.cookie.putObject('movie' , this.selectedMovie);
    this.viewCinemas();
    this.selectedCinema = null;
    this.selectedParty = null;
    this.parties = null;
  }

  updateCinema(cinema){
    this.selectedCinema = cinema;
    // this.cookie.putObject('cinema' , this.selectedCinema);
  }

  updateParty(party){
    this.selectedParty = party;
  }

  submitParty(){

    this.cookie.putObject('cinema' , this.selectedCinema);
    this.cookie.putObject('movie' , this.selectedMovie);
    this.cookie.putObject('party' , this.selectedParty);

    let booking = {
      username: this.cookie.get('username'),
      cinema_name: this.selectedCinema.name,
      cinema_location: this.selectedCinema.location,
      hall_number: this.selectedParty.hall,
      date: this.choosenDate,
      time: this.selectedParty.time,
      seats: null,
      eachPrice: this.selectedParty.price,
      movie: this.selectedMovie.movie_id
    };
    
    this.cookie.putObject('booking', booking);

    // this.router.navigate(['/booking/seating']);
  }

  getPartiesAtThisDate(){
    // this.date = this.dateTemp._i.year+'-'+(this.dateTemp._i.month+1)+'-'+this.dateTemp._i.date;
    // if(this.flagD == this.date && this.flagM == this.selectedMovie && this.flagC == this.selectedCinema){
    //   return;
    // }
    this.partiesService.getParties(this.selectedCinema.location ,this.selectedCinema.name , this.selectedMovie.movie_id , this.choosenDate).subscribe((response) =>{
      this.parties = response.data;
      console.log(response.data);
      this.flagD = this.date;
      this.flagM = this.selectedMovie ;
      this.flagC = this.selectedCinema;

    });
  }


  getDates(){
    this.today=new Date();
    this.today=this.datePipe.transform(this.today,'yyyy-MM-dd');
    this.day0=this.addDays(this.today,0);
    this.day0=this.datePipe.transform(this.day0,'yyyy-MM-dd');
    this.today=new Date();
    this.today=this.datePipe.transform(this.today,'yyyy-MM-dd');
    this.day1=this.addDays(this.today,1);
    this.day1=this.datePipe.transform(this.day1,'yyyy-MM-dd');
    this.today=new Date();
    this.today=this.datePipe.transform(this.today,'yyyy-MM-dd');
    this.day2=this.addDays(this.today,2);
    this.day2=this.datePipe.transform(this.day2,'yyyy-MM-dd');
    this.today=new Date();
    this.today=this.datePipe.transform(this.today,'yyyy-MM-dd');
    this.day3=this.addDays(this.today,3);
    this.day3=this.datePipe.transform(this.day3,'yyyy-MM-dd');
    this.today=new Date();
    this.today=this.datePipe.transform(this.today,'yyyy-MM-dd');
    this.day4=this.addDays(this.today,4);
    this.day4=this.datePipe.transform(this.day4,'yyyy-MM-dd');

  }


  addDays(date,days){
    this.today=new Date(date);
    this.today.setDate(this.today.getDate()+days);
    return this.today;
  }


}
