import { Component, OnInit } from '@angular/core';
import { Alert } from '../../@objects/alert';
import { Layout } from '../../@objects/layout';
import { HallService } from '../../@services/hall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  layouts: Layout[];
  alert: Alert = new Alert();

  constructor(public hallService: HallService,
  public router: Router) { }

  ngOnInit() {
    this.hallService.getMinifiedLayouts().subscribe((response) => {
      this.layouts = response;
    });
  }

  editLayout(layout: Layout) {
    this.router.navigate(['/hall/layout', layout.id]);
  }

  deleteLayout(layout: Layout) {
    var data = {
      id: layout.id
    }

    this.hallService.deleteLayout(data).subscribe(() => {
      this.alert = {
        message: 'Layout Deleted',
        type: 'success',
        active: true
      }

      this.ngOnInit();
    });
  }

}
