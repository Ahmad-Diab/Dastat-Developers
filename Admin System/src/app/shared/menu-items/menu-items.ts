import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS =
  [{
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'adminBooking',
    name: 'Tickets',
    type: 'sub',
    icon: 'basic-webpage-multiple',
    children: [
      {
        state: 'makeReservation',
        name: 'MakeReservation'
      },
      {
        state: 'verifyTicket',
        name: 'Verify or Cancel'
      }
    ]
  },
 
  
 
];



@Injectable()
export class MenuItems {

  constructor(cookie: CookieService) {
    let type = cookie.getObject('auth')['type'];

    //APP OWNER SIDEBAR ITEMS
    if(type=='App Owner') {
      MENUITEMS.push({
        state: 'promocodes',
        name: 'promocodes',
        type: 'link',
        icon: 'ecommerce-gift'
      },
      {
        state: 'movies',
        name: 'My Movies',
        type: 'sub',
        icon: 'basic-webpage-multiple',
        children: [
          {
            state: 'requests-ao',
            name: 'Requests'
          },
          {
            state: 'view-movies',
            name: 'View Movies'
          }
     
         
        ]
      },{
        state: 'halls',
        name: 'halls',
        type: 'link',
        icon: 'ecommerce-gift'
      })
    }

     //Cinema Owner

     if(type=='Cinema Owner') {
      MENUITEMS.push(
      {
        state: 'movies',
        name: 'My Movies',
        type: 'sub',
        icon: 'basic-webpage-multiple',
        children: [
          {
            state: 'requests-ao',
            name: 'Requests'
          }
         ]
      },{
        state: 'halls',
        name: 'halls',
        type: 'link',
        icon: 'ecommerce-gift'
      })
    }



     //Branch Manager
     if(type=='Branch Manager') {
      MENUITEMS.push(
      {
        state: 'movies',
        name: 'My Movies',
        type: 'sub',
        icon: 'basic-webpage-multiple',
        children: [
          {
            state: 'requests-ao',
            name: 'Requests'
          }
         ]
      },{
        state: 'halls',
        name: 'halls',
        type: 'link',
        icon: 'ecommerce-gift'
      })
    }




    //
  }
  getAll(): Menu[] {
    return MENUITEMS;
  }

  // add(menu: Menu) {
  //   MENUITEMS.push(menu);
  // }
}
