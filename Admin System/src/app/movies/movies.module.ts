import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MoviesRouting } from './movies-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsCoBmComponent } from './requests-co-bm/requests-co-bm.component';
import { RequestsAoComponent } from './requests-ao/requests-ao.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MoviesRouting),
     FormsModule
  ],
  declarations: [RequestsCoBmComponent, RequestsAoComponent, ViewMoviesComponent]
})
export class MoviesModule { }
