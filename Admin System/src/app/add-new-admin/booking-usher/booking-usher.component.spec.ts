import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingUsherComponent } from './booking-usher.component';

describe('BookingUsherComponent', () => {
  let component: BookingUsherComponent;
  let fixture: ComponentFixture<BookingUsherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingUsherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingUsherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
