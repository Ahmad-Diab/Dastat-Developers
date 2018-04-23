import { Routes } from '@angular/router' ;
import { AdmincinemasComponent } from './admincinemas/admincinemas.component' ;
export const mycinemasRoutes : Routes = [{
path : '' ,
component : AdmincinemasComponent ,
data : {
heading : 'admincinemas' 
}
}];
