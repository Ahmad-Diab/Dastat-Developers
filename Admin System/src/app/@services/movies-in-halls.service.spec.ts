import { TestBed, inject } from '@angular/core/testing';

import { MoviesInHallsService } from './movies-in-halls.service';

describe('MoviesInHallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesInHallsService]
    });
  });

  it('should be created', inject([MoviesInHallsService], (service: MoviesInHallsService) => {
    expect(service).toBeTruthy();
  }));
});
