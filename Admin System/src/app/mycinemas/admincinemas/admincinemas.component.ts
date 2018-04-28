import { Component, OnInit } from '@angular/core';
import { CinemaslistService } from '../../@services/cinemaslist.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { Cinema } from '../../@objects/cinema';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../@objects/alert';
import { ModalCinema } from '../modals/cinema.component';


@Component({
  selector: 'app-admincinemas',
  templateUrl: './admincinemas.component.html',
  styleUrls: ['./admincinemas.component.scss']
})

export class AdmincinemasComponent implements OnInit {

  cinemas: Cinema[];
  sorting_item;

  alert: Alert = new Alert();

  constructor(public cinemalistService: CinemaslistService,
    public router: Router, public route: ActivatedRoute , public cinema: Cinema, public modalService: NgbModal) { }

  ngOnInit() {
    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas=response;
    });
  }
  
  onupdate(cinema: Cinema){
    const modalRef = this.modalService.open(ModalCinema);
    modalRef.componentInstance.cinema = cinema;
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  ondelete(cinema: Cinema){
    this.cinemalistService.delete(cinema.location, cinema.name).subscribe(() => {
      this.alert = {
        message: 'Cinema Deleted',
        type: 'success',
        active: true
      }

      this.ngOnInit();
    });
  }

  AddCinema(){
    const modalRef = this.modalService.open(ModalCinema);
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  closeAlert() {
    this.alert.active = false;
  }
  
}
