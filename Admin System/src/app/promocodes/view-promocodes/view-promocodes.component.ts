import { Component, OnInit } from '@angular/core';
import { PromocodesService } from '../../@services/promocodes.service';
import { FormControl} from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { ModalPromocodes } from '../modals/promocodes.component';
import { Alert } from '../../@objects/alert';
import { Promocode } from '../../@objects/promocode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-promocodes',
  templateUrl: './view-promocodes.component.html',
  styleUrls: ['./view-promocodes.component.scss']
})
export class ViewPromocodesComponent implements OnInit {

  alert: Alert = new Alert();

  promocodes = []               //  array of promocodes to be displayed, promocode has promocode data
  promocodesWithCinema = []     //  array of promocodes to be displayed in table, promocode has promocode data and in which cinema
  promocodesToShow = []         //  array of unique promocodes to choose from for assigning  promocode to cinema

  existPromocodesAssigned = ""  //  String, that when there are no promocodes assigned to a cineama, has message stating that for the admin
  existPromocodes = ""          //  String, that when there are no promocodes, has message stating that for the admin
 
  assignedPromocodeView = true  //  controls which view is displayed. either view of promocodes or view of promocodes in which cinemas
  
  p : number = 1;


  constructor(public promocodesService: PromocodesService, public modalService: NgbModal) { }

  ngOnInit() {

    this.getPromocodes();

    // Get the distinct values of promocodes and cinemas to choose from in assigning promocodes to cinemas  
    this.promocodesService.getPromocodesAndCinemas().subscribe((response) =>{
      this.promocodesToShow = response.data.promocodeResults;
      if(this.promocodesToShow.length === 0)  this.existPromocodes = "No Promocodes exist"
      else  this.existPromocodes = ""
      this.promocodes = this.promocodesToShow
    });

  }

  assignPromocodeToCinema(promocode : Promocode){
    const modalRef = this.modalService.open(ModalPromocodes);
    modalRef.componentInstance.promocode = promocode;
    modalRef.componentInstance.assigned = true;
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    }); 
  }

  delete(promocode: any){
    this.promocodesService.deletePromocode(promocode.promocode).subscribe((response) =>{
      this.alert = {
        message: 'Promocode Deleted',
        type: 'danger',
        active: true
      }
      this.ngOnInit();
    })
  }

  addPromocode(promocode: Promocode) {
    const modalRef = this.modalService.open(ModalPromocodes);
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  editPromocode(promocode: Promocode){
    const modalRef = this.modalService.open(ModalPromocodes);
    modalRef.componentInstance.promocode = promocode;
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }

  /**
   * Get the promocodes data in the needed arrays (promocodes, promocodesWithCinema)
   */
  getPromocodes() {
    this.promocodesService.getPromocodes().subscribe((response) => {
      this.promocodesWithCinema = response.data;
      if(this.promocodesWithCinema.length === 0)  this.existPromocodesAssigned = "No Promocodes are assigned to cinema"
      else  this.existPromocodesAssigned = ""
    });
  }

  closeAlert() {
    this.alert.active = false;
  }

}