import { Routes } from '@angular/router';
import { BookingUsher } from './booking-usher/booking-usher.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { CinemaOwnerComponent } from './cinema-owner/cinema-owner.component';


export const AdminsRoutes: Routes = [
    {
    path: '',
        component: ViewAdminComponent,
        data: {
            heading: 'Admins',
            removeFooter: false
        }
    },
    {
    path: 'bookingusher',
        component: BookingUsher,
        data: {
            heading: 'Booking Ushers',
            removeFooter: false
        }
    },
    {
        path: 'branchmanager',
            component: BranchManagerComponent,
            data: {
                heading: 'Branch Managers',
                removeFooter: false
            }
        },
    {
        path: 'cinemaowner',
        component: CinemaOwnerComponent,
        data: {
            heading: 'Cinema Owners',
            removeFooter: false
        }
    }
];
