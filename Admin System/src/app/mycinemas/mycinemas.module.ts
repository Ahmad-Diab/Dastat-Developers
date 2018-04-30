import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdmincinemasComponent } from './admincinemas/admincinemas.component';
import { mycinemasRoutes } from './mycinemas.routing';
import { FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(mycinemasRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [AdmincinemasComponent]
})
export class MycinemasModule { }
