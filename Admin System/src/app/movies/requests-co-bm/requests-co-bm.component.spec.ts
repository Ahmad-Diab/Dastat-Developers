import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsCoBmComponent } from './requests-co-bm.component';

describe('RequestsCoBmComponent', () => {
  let component: RequestsCoBmComponent;
  let fixture: ComponentFixture<RequestsCoBmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsCoBmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsCoBmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
