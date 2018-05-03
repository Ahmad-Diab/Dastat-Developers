import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Auth } from '../../@guards/auth.guard';

@Component({
  selector: 'app-requests-co-bm',
  templateUrl: './requests-co-bm.component.html',
  styleUrls: ['./requests-co-bm.component.scss']
})
export class RequestsCoBmComponent implements OnInit {

  movies=[];
  admin_req;
  responeStatus='';
  moviesAction= false
   username: string;
  

  constructor(public movieServices: MoviesService,private router:Router,public cookie:CookieService, private route: ActivatedRoute) { }

  ngOnInit() {

    var auth = <Auth>(this.cookie.getObject('auth'));
    this.username = auth.username;
    
    this.movieServices.viewRequests(this.username).subscribe((response)=>{
      if(!response) this.movies = []
      else this.movies= response.data;
    });
    


  }
  deleteReq(movie_id: number){
    this.movieServices.deleteRequest(movie_id).subscribe((response)=>{
        this.responeStatus="Successfully deleted";
        this.ngOnInit();
    });
}

getMovieInfo(movie){
  this.router.navigate(['movies/edit-req/',movie.movie_id]);
}

toogleMovie(){
  this.moviesAction = !this.moviesAction;
}

// ADD A REQUEST

addReq(title: string, duration: any, genre: string, description: string,imagePath: string,cast: string, release_date:Date,username: string){
    let year = parseInt(((String) (release_date)).substring(0,4));
    this.movieServices.addRequest(title,duration,genre,description,imagePath,cast,year,3,release_date,5,username).subscribe((response)=>{
      this.responeStatus="Added";
      this.ngOnInit();
    });  
     
}


}