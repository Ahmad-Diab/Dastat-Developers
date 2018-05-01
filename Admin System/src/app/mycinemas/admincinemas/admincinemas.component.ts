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
      var i;
      for (i = 0; i < this.cinemas.length; i++) {
        if(this.cinemas[i].is3D.data.length == 1){
          if(this.cinemas[i].is3D.data[0] == "0") {
            this.cinemas[i].is3D = 0;
          } else {
            this.cinemas[i].is3D = 1;
          }
        }
        if(this.cinemas[i].is4D.data.length == 1){
          if(this.cinemas[i].is4D.data[0] == "0") {
            this.cinemas[i].is4D = 0;
          } else {
            this.cinemas[i].is4D = 1;
          }
        }
      }
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
    this.cinemalistService.deleteCinema(cinema.location, cinema.name).subscribe((response) => {
      console.log(response);
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

  openImage1(cinema: Cinema){
    const modalRef = this.modalService.open(ModalCinema);
    modalRef.componentInstance.cinema = cinema;
    modalRef.componentInstance.image1 = true;
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  openImage2(cinema: Cinema){
    const modalRef = this.modalService.open(ModalCinema);
    modalRef.componentInstance.cinema = cinema;
    modalRef.componentInstance.image2 = true;
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  closeAlert() {
    this.alert.active = false;
  }
  
}
