import { TestBed, inject } from '@angular/core/testing';

import { FilterCinemaService } from './filter-cinema.service';

describe('FilterCinemaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterCinemaService]
    });
  });

  it('should be created', inject([FilterCinemaService], (service: FilterCinemaService) => {
    expect(service).toBeTruthy();
  }));
});
