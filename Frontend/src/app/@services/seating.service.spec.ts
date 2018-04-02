import { TestBed, inject } from '@angular/core/testing';

import { SeatingService } from './seating.service';

describe('SeatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeatingService]
    });
  });

  it('should be created', inject([SeatingService], (service: SeatingService) => {
    expect(service).toBeTruthy();
  }));
});
