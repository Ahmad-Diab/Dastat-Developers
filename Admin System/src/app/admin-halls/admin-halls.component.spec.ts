import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHallsComponent } from './admin-halls.component';

describe('AdminHallsComponent', () => {
  let component: AdminHallsComponent;
  let fixture: ComponentFixture<AdminHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
