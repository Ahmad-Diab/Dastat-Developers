import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaInfoComponent } from './cinema-info.component';

describe('CinemaInfoComponent', () => {
  let component: CinemaInfoComponent;
  let fixture: ComponentFixture<CinemaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
