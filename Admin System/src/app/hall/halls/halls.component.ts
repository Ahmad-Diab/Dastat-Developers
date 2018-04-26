import { Component, OnInit } from '@angular/core';
import { Hall } from '../../@objects/hall';
import { HallService } from '../../@services/hall.service';
import { Alert } from '../../@objects/alert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHall } from '../modals/hall.component';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss']
})
export class HallsComponent implements OnInit {

  halls: Hall[];
  alert: Alert = new Alert();

  constructor(public hallService: HallService,
    public modalService: NgbModal,) { }

  ngOnInit() {
    this.hallService.getHalls().subscribe((response) => {
      this.halls = response;
    });
  }

  editHall(hall: Hall) {
    const modalRef = this.modalService.open(ModalHall);
    modalRef.componentInstance.hall = hall;
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  } 

  addHall() {
    const modalRef = this.modalService.open(ModalHall);
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  closeAlert() {
    this.alert.active = false;
  }

  deleteHall(hall: Hall) {
    this.hallService.deleteHall(hall).subscribe(() => {
      this.alert = {
        message: 'Hall Deleted',
        type: 'success',
        active: true
      }

      this.ngOnInit();
    });
  }

}
