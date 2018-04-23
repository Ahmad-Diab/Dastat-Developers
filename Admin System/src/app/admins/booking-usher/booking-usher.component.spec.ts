import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingUsher } from './booking-usher.component';

describe('EditComponent', () => {
  let component: BookingUsher;
  let fixture: ComponentFixture<BookingUsher>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingUsher ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingUsher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
