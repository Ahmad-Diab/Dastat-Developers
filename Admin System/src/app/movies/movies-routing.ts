
import { Routes} from '@angular/router';

import { RequestsAoComponent } from './requests-ao/requests-ao.component';
import { RequestsCoBmComponent } from './requests-co-bm/requests-co-bm.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { InfoEditComponent } from './info-edit/info-edit.component';

export const MoviesRouting: Routes = [
  {
    path: '',
    children: [{
      path: 'requests-ao',
      component: RequestsAoComponent
    }, {
      path: 'requests-co-bm',
      component: RequestsCoBmComponent
    },{
      path: 'info-edit/:movie_id',
      component: InfoEditComponent
    }, {
      path: 'view-movies',
      component: ViewMoviesComponent
    }]
  }
];

