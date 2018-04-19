import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaslistComponent } from './cinemaslist.component';

describe('CinemaslistComponent', () => {
  let component: CinemaslistComponent;
  let fixture: ComponentFixture<CinemaslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
