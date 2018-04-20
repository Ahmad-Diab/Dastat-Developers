import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MoviesRouting } from './movies-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsCoBmComponent } from './requests-co-bm/requests-co-bm.component';
import { RequestsAoComponent } from './requests-ao/requests-ao.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MoviesRouting),
     FormsModule,
     NgbTooltipModule
  ],
  declarations: [RequestsCoBmComponent, RequestsAoComponent, ViewMoviesComponent, InfoEditComponent]
})
export class MoviesModule { }
