import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsAoComponent } from './requests-ao.component';

describe('RequestsAoComponent', () => {
  let component: RequestsAoComponent;
  let fixture: ComponentFixture<RequestsAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
