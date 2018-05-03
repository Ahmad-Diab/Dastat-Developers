import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Auth } from '../../@guards/auth.guard';

@Component({
  selector: 'app-edit-req',
  templateUrl: './edit-req.component.html',
  styleUrls: ['./edit-req.component.scss']
})
export class EditReqComponent implements OnInit {
  movie;
  movieEdit= false
  username: string;
  statusPend :'PENDING'
  constructor(public MoviesService: MoviesService,private route : ActivatedRoute, 
    public cookie : CookieService ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.movie = params['movie_id']);
    console.log(this.movie);
    this.MoviesService.getMovieInfo(this.movie).subscribe((response)=>{
      this.movie=response.data[0];
      console.log(this.movie.movie_id)
      console.log(response.data[0]);
      var auth = <Auth>(this.cookie.getObject('auth'));
    this.username = auth.username;
    });
  }

  toogleEdit(){
    this.movieEdit = !this.movieEdit;
  }


    //---------EDIT A REQUESR----------------
editReq(title: string, duration: any, genre: string, description: string,imagePath: string,cast: string, feature: number, release_date:Date,rating: number,username: string,movie_id: string){ 
    let year = parseInt(((String) (release_date)).substring(0,4));
      this.MoviesService.editRequest(title,duration,genre,description,imagePath,cast,year,this.movie.feature,release_date,this.movie.rating,username,this.movie.movie_id).subscribe((response)=>{
        this.ngOnInit();
        });  
  }

  putMovieInCookie(){
    this.cookie.putObject('movie' , this.movie);
  } 




  }

