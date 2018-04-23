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
  

  constructor(public movieServices: MoviesService,private router:Router,public cookie:CookieService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  viewReq(auth){
    let cookie: CookieService = new CookieService;
    auth = <Auth>(cookie.getObject('auth'));
    console.log(auth);
    this.movieServices.viewRequests(auth.username).subscribe((response)=>{
      this.movies=response;
      console.log(response.data[0]);
      console.log("A7a i was here");
      console.log(auth);
    
  });
  }

  deleteReq(movie_id: number){
    this.movieServices.deleteRequest(movie_id).subscribe((response)=>{
        this.responeStatus="Successfully deleted";
    });
}

getMovieInfo(movie){
  this.router.navigate(['movies/info-edit/',movie.movie_id]);
}

toogleMovie(){
  this.moviesAction = !this.moviesAction;
}
// ADD A REQUEST


addReq(title: string, duration: number, genre: string, description: string,imagePath: string,cast: string,
  year: number, feature: number, release_date:Date,rating: number,status: string,admin_requested: string){

     this.movieServices.addRequest(title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,admin_requested).subscribe((response)=>{
       this.responeStatus="Added";
       this.ngOnInit();
     });  
     
}


}
