import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaOwnerComponent } from './cinema-owner.component';

describe('CinemaOwnerComponent', () => {
  let component: CinemaOwnerComponent;
  let fixture: ComponentFixture<CinemaOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
