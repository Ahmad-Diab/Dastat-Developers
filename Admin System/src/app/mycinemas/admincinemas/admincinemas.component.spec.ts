import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincinemasComponent } from './admincinemas.component';

describe('AdmincinemasComponent', () => {
  let component: AdmincinemasComponent;
  let fixture: ComponentFixture<AdmincinemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincinemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
