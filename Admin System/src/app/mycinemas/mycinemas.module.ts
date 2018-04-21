import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdmincinemasComponent } from './admincinemas/admincinemas.component';
import { mycinemasRoutes } from './mycinemas.routing';
import { FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(mycinemasRoutes),
     FormsModule
  ],
  declarations: [AdmincinemasComponent]
})
export class MycinemasModule { }
