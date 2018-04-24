import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesInHallsComponent } from './movies-in-halls.component';

describe('MoviesInHallsComponent', () => {
  let component: MoviesInHallsComponent;
  let fixture: ComponentFixture<MoviesInHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesInHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesInHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
