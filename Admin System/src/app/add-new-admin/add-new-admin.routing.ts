import   {   Routes   }   from   '@angular/router' ;
import { BookingUsherComponent } from './booking-usher/booking-usher.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { CinemaOwnerComponent } from './cinema-owner/cinema-owner.component';
export   const   AddNewAdminRoutes :   Routes   =   [

{ path :   'booking-usher' ,
component :   BookingUsherComponent  ,
data :   {
heading :   'Add New Admin' ,
removeFooter :   true  }
},
{ path :   'branch-manager' ,
component :   BranchManagerComponent  ,
data :   {
heading :   'Add New Admin' ,
removeFooter :   false  }
},
{ path :   'cinema-owner' ,
component :   CinemaOwnerComponent  ,
data :   {
heading :   'Add New Admin' ,
removeFooter :   false  }
}];