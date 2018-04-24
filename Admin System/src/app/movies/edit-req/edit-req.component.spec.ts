import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReqComponent } from './edit-req.component';

describe('EditReqComponent', () => {
  let component: EditReqComponent;
  let fixture: ComponentFixture<EditReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
