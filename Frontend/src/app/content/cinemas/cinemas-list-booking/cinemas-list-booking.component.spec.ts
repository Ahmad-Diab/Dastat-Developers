import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemasListBookingComponent } from './cinemas-list-booking.component';

describe('CinemasListBookingComponent', () => {
  let component: CinemasListBookingComponent;
  let fixture: ComponentFixture<CinemasListBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemasListBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemasListBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
