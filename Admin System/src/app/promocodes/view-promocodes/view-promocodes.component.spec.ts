import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromocodesComponent } from './view-promocodes.component';

describe('ViewPromocodesComponent', () => {
  let component: ViewPromocodesComponent;
  let fixture: ComponentFixture<ViewPromocodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPromocodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPromocodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
