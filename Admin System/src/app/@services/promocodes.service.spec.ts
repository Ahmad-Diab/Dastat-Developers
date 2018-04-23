import { TestBed, inject } from '@angular/core/testing';

import { PromocodesService } from './promocodes.service';

describe('PromocodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocodesService]
    });
  });

  it('should be created', inject([PromocodesService], (service: PromocodesService) => {
    expect(service).toBeTruthy();
  }));
});
